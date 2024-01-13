import React, { useState, useEffect } from "react";

import { f7, f7ready, App, Button, Navbar, Link, Block, Icon, Page } from "framework7-react";

import { createBusiness } from "../services/businessService";
import { isUserAuthenticated } from "../services/authenticationService";
import BusinessList from "./BusinessList";

const HomePage = () => {
  const [authenticated, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserAuthenticated());
  });

  return (
    <Page>
      <Block>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {authenticated ? (
            <Button fill onClick={() => f7.views.main.router.navigate("/create/")}>
              Neu
            </Button>
          ) : (
            <div style={{ width: "50px" }}></div>
          )}
          <h2
            style={{
              flex: 1, // This makes the text container take up the available space
              textAlign: "center",
            }}
          >
            Business Reviews
          </h2>
          {authenticated ? (
            <Button onClick={() => f7.views.main.router.navigate("/profile/")} style={{ marginLeft: "auto" }}>
              <Icon f7="person" />
            </Button>
          ) : (
            <Button fill onClick={() => f7.views.main.router.navigate("/login/")}>
              Login
            </Button>
          )}
        </div>
      </Block>

      <BusinessList loggedIn={authenticated} />
    </Page>
  );
};

export default HomePage;

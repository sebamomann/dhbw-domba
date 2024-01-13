import React, { useState, useEffect } from "react";
import { f7, Page, Block, Button, Icon } from "framework7-react";
import { isUserAuthenticated } from "../services/authenticationService";
import { eventEmitter } from "../js/eventemitter";
import BusinessList from "../components/BusinessList";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      setIsAuthenticated(isUserAuthenticated());
    } catch (error) {
      console.error("Error in authentication check:", error);
      eventEmitter.emit("error", "An error occurred while checking authentication status.");
    }
  });

  const navigateTo = (route) => {
    f7.views.main.router.navigate(route);
  };

  return (
    <Page>
      <Block>
        <div className="home-header">
          {isAuthenticated ? (
            <Button fill onClick={() => navigateTo("/create/")}>
              Neu
            </Button>
          ) : (
            <div className="placeholder-div"></div>
          )}
          <h2 className="home-title">Business Reviews</h2>
          {isAuthenticated ? (
            <Button onClick={() => navigateTo("/profile/")}>
              <Icon f7="person" />
            </Button>
          ) : (
            <Button fill onClick={() => navigateTo("/login/")}>
              Login
            </Button>
          )}
        </div>
      </Block>
      <BusinessList loggedIn={isAuthenticated} />
    </Page>
  );
};

export default HomePage;

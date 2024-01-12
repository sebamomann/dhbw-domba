import React, { useState, useEffect } from "react";

import { f7, f7ready, App, Button, Navbar, Link, Block, Icon, Page } from "framework7-react";

import { createBusiness, subscribeForPushNotifications } from "../services/businessService";
import { getAuthenticatedUserData, isUserAuthenticated, logoutUser } from "../services/authenticationService";

import BusinessList from "./BusinessList";

const HomePage = () => {
  const [authenticated, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const [subbed, setIsSubscribed] = useState(false);

  const handleCreateBusiness = async (businessData) => {
    await createBusiness(businessData);
  };

  useEffect(() => {
    setIsLoggedIn(isUserAuthenticated());
    setUserData(getAuthenticatedUserData());
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    logoutUser();
  };

  const flexContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const welcomeTextStyle = {
    flexGrow: 1,
    textAlign: "center",
    margin: 0, // Removes default paragraph margin for accurate centering
  };

  const logoutButtonStyle = {
    // no additional style needed for the button in this approach
  };

  return (
    <Page>
      <Block>
        {authenticated ? (
          <div style={flexContainerStyle}>
            <Button style={logoutButtonStyle} onClick={() => f7.views.main.router.navigate("/create")}>
              <Icon f7="plus_circle_fill" />
            </Button>
            <h2 style={welcomeTextStyle}>Hi, {userData.name}!</h2>
            <Button style={logoutButtonStyle} onClick={handleLogout}>
              <Icon f7="arrow_right_square" />
            </Button>
          </div>
        ) : (
          <Button fill onClick={() => f7.views.main.router.navigate("/login/")}>
            Login
          </Button>
        )}
      </Block>

      <BusinessList loggedIn={authenticated} />
    </Page>
  );
};

export default HomePage;

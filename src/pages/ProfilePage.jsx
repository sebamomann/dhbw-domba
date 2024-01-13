import React, { useState, useEffect } from "react";
import { Page, Button, Block, Icon, f7 } from "framework7-react";
import { getAuthenticatedUserData, isUserAuthenticated, logoutUser } from "../services/authenticationService";
import { isSubscribedToPush, subscribeToPush, unsubscribeFromPush } from "../services/pushService";

const ProfilePage = ({ f7router }) => {
  const [userData, setUserData] = useState(null);
  const [authenticated, setIsLoggedIn] = useState(false);

  const [isPushSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserAuthenticated());
    setUserData(getAuthenticatedUserData());
    setIsSubscribed();

    async function fetchAndSetSubscriptionStatus() {
      setIsSubscribed(await isSubscribedToPush());
    }
    fetchAndSetSubscriptionStatus();
  }, [authenticated]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    logoutUser();

    f7router.back();
  };

  const welcomeTextStyle = {
    flexGrow: 1,
    textAlign: "center",
    margin: 0, // Removes default paragraph margin for accurate centering
  };

  const subscribePush = async () => {
    await subscribeToPush();
    setIsSubscribed(true);
  };

  const unsubscribePush = () => {
    unsubscribeFromPush();
    setIsSubscribed(false);
  };

  return (
    <Page>
      <Block>
        {authenticated ? (
          <div>
            <h2 style={welcomeTextStyle}>Hi, {userData.name}!</h2>
            {isPushSubscribed ? (
              <Button onClick={() => unsubscribePush()}>Benachrichtigungen auf diesem Gerät deaktivieren</Button>
            ) : (
              <Button onClick={() => subscribePush()}>Benachrichtigungen auf diesem Gerät aktivieren</Button>
            )}
            <Button onClick={handleLogout}>
              <Icon f7="arrow_right_square" /> Abmelden
            </Button>
          </div>
        ) : (
          <Button fill onClick={() => f7.views.main.router.navigate("/login/")}>
            Login
          </Button>
        )}

        <Block style={{ display: "flex", gap: "16px" }}>
          <Button onClick={() => f7.views.main.router.back()} style={{ width: "50%", backgroundColor: "#E1E2EC" }}>
            Zurück
          </Button>
        </Block>
      </Block>
    </Page>
  );
};

export default ProfilePage;

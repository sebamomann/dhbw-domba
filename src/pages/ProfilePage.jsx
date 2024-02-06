import React, { useState, useEffect } from "react";
import { Page, Button, Block, Icon, f7 } from "framework7-react";
import { getAuthenticatedUserData, isUserAuthenticated, logoutUser } from "../services/authenticationService";
import { isSubscribedToPush, subscribeToPush, unsubscribeFromPush } from "../services/pushService";
import { eventEmitter } from "../js/eventemitter";

const ProfilePage = ({ f7router }) => {
  const [userData, setUserData] = useState(null);
  const [authenticated, setIsLoggedIn] = useState(false);
  const [isPushSubscribed, setIsSubscribed] = useState(false);

  /**
   * Initialize component. Load user data. Manage push notification state.
   */
  useEffect(() => {
    try {
      const authStatus = isUserAuthenticated();
      setIsLoggedIn(authStatus);

      if (authStatus) {
        setUserData(getAuthenticatedUserData());

        const fetchAndSetSubscriptionStatus = async () => {
          setIsSubscribed(await isSubscribedToPush());
        };

        fetchAndSetSubscriptionStatus();
      }
    } catch (err) {
      console.error("Error in profile setup:", err);
      eventEmitter.emit("error", "An error occurred while setting up the profile.");
    }
  }, []);

  /**
   * Trigger logout and clear data. Navigate back to origin.
   */
  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUserData(null);
    f7router.back();
  };

  /**
   * Handle subscription trigger.<br/>
   * Toggle subscription to passed state.
   *
   * @param {boolean} subscriptionTargetState  Expected state
   */
  const handleSubscription = async (subscriptionTargetState) => {
    try {
      if (subscriptionTargetState) {
        await subscribeToPush();
      } else {
        await unsubscribeFromPush();
      }

      setIsSubscribed(subscriptionTargetState);
    } catch (err) {
      console.error("Error in subscription handling:", err);
      eventEmitter.emit("error", "An error occurred with push notifications.");
    }
  };

  return (
    <Page>
      <Block>
        {authenticated && userData ? (
          <>
            <div className="profile-header">
              <div className="placeholder-div"></div>
              <h2 className="profile-title">Hi, {userData.name}!</h2>
              <Button onClick={handleLogout}>
                <Icon f7="arrow_right_square" />
              </Button>
            </div>
            <p className="info-text">Um über neue Bewertungen informiert zu werden, dienen Push Benachrichtigungen.</p>
            <Button onClick={() => handleSubscription(!isPushSubscribed)}>
              {isPushSubscribed
                ? "Benachrichtigungen auf diesem Gerät deaktivieren"
                : "Benachrichtigungen auf diesem Gerät aktivieren"}
            </Button>
          </>
        ) : (
          <Button fill onClick={() => f7router.navigate("/login/")}>
            Login
          </Button>
        )}
        <Block className="button-group">
          <Button onClick={() => f7router.back()} className="back-button">
            Zurück
          </Button>
        </Block>
      </Block>
    </Page>
  );
};

export default ProfilePage;

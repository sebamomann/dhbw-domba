import React, { useState } from "react";
import { Page, List, ListInput, Button, Block } from "framework7-react";

import { authenticateUser } from "../services/authenticationService";

/**
 * Login page for user authentication.
 * Simple authentication form which updates page wide states on login
 *
 * @param {*} param0 router object
 *
 * @returns
 */
const LoginPage = ({ f7router }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  /**
   * Execute Login
   * Trigger login in API. Handle and display error if necessary.
   *
   * @returns void
   */
  const submitLoginForm = async () => {
    try {
      const isAuth = await authenticateUser(username, password);

      if (isAuth) {
        console.log("User authenticated successfully");
        f7router.back();
      } else {
        console.log("Authentication failed: Incorrect username or password");
        setLoginError("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setLoginError("An error occurred during login");
    }
  };

  return (
    <Page name="login">
      <h1 className="page-title">Login</h1>

      <List form>
        <ListInput
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onInput={(e) => setUsername(e.target.value)}
        />
        <ListInput
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
      </List>

      {loginError && <Block className="error-message-inline">{loginError}</Block>}

      <Block className="button-group">
        <Button onClick={() => f7router.back()} className="back-button">
          Zurück
        </Button>
        <Button fill onClick={submitLoginForm} className="login-button">
          Anmelden
        </Button>
      </Block>
    </Page>
  );
};

export default LoginPage;

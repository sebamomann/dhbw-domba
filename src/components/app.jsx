import React, { useState, useEffect } from "react";

import {
  f7,
  f7ready,
  App,
  Button,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
} from "framework7-react";

import routes from "../js/routes";
import store from "../js/store";
import BusinessCreationForm from "../pages/businessCreationForm";
import BusinessList from "../pages/businessList";
import { createBusiness, authenticate } from "../services/businessService";

const MyApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState();

  // Framework7 Parameters
  const f7params = {
    name: "publicapi", // App name
    theme: "auto", // Automatic theme detection
    store: store,
    routes: routes,
  };

  f7ready(() => {});

  const handleCreateBusiness = async (businessData) => {
    console.log("handleCreateBusiness " + businessData);
    await createBusiness(businessData);
  };

  const handleLogin = async () => {
    // Implement your login logic here
    // Once the user is logged in, set isLoggedIn to true
    let isAuth = await authenticate(username, password);

    if (isAuth) {
      console.log("aaa");
      setIsLoggedIn(true);
      f7.loginScreen.close();
    } else {
      console.log("bbb");
      setLoginError("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <App>
      <Page>
        <Navbar title="Your App" />

        <Block>
          {isLoggedIn ? (
            // User is logged in, display username and logout button
            <>
              <p>Welcome, {username}!</p>
              <Button fill onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            // User is not logged in, display login button
            <>
              <Button fill loginScreenOpen="#my-login-screen">
                Login
              </Button>
            </>
          )}
        </Block>

        <BusinessList />

        {isLoggedIn ? <BusinessCreationForm onSubmit={handleCreateBusiness} /> : <></>}
      </Page>

      <LoginScreen id="my-login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput
                type="text"
                name="username"
                placeholder="Your username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
            </List>
            <Block class="text-align-center">{loginError}</Block>
            <List>
              <ListButton title="Sign In" onClick={handleLogin} />
              <ListButton title="Back" loginScreenClose="#my-login-screen" />
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  );
};
export default MyApp;

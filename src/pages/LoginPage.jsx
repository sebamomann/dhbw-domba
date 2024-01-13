import React, { useState } from "react";
import { Page, List, ListInput, Button, Block } from "framework7-react";
import { authenticateUser } from "../services/authenticationService";

const LoginPage = ({ f7router }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const submitLoginForm = async () => {
    let isAuth = await authenticateUser(username, password);

    if (isAuth) {
      f7router.back();
    } else {
      setLoginError("Incorrect username or password");
    }
  };

  return (
    <Page name="login">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <List form>
        <ListInput
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onInput={(e) => setUsername(e.target.value)}
        ></ListInput>
        <ListInput
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        ></ListInput>
      </List>

      <Block style={{ textAlign: "center", color: "red" }}>{loginError}</Block>

      <Block style={{ display: "flex", gap: "16px" }}>
        <Button onClick={() => f7router.back()} style={{ width: "50%", backgroundColor: "#E1E2EC" }}>
          Zurück
        </Button>
        <Button fill onClick={submitLoginForm} style={{ width: "50%" }}>
          Anmelden
        </Button>
      </Block>
    </Page>
  );
};

export default LoginPage;

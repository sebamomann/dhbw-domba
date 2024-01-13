import React, { useState } from "react";

import { f7ready, App, View } from "framework7-react";

import routes from "../js/routes";
import { eventEmitter } from "../js/eventemitter";

const MyApp = () => {
  const [error, setError] = useState("");

  // Framework7 Parameters
  const f7params = {
    name: "Business Reviews", // App name
    theme: "auto", // Automatic theme detection
    routes: routes,
  };

  f7ready(() => {});

  eventEmitter.subscribe("error", (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError("");
    }, 3000);
  });

  return (
    <App {...f7params}>
      {error && <div className="error-message">{error}</div>}
      <View main url="/" />
    </App>
  );
};

export default MyApp;

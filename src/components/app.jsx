import React from "react";

import { f7ready, App, View } from "framework7-react";

import routes from "../js/routes";

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: "Business Reviews", // App name
    theme: "auto", // Automatic theme detection
    routes: routes,
  };

  f7ready(() => {});

  return (
    <App {...f7params}>
      <View main url="/" />
    </App>
  );
};

export default MyApp;

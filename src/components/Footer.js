import React from "react";
import { Grid, AppBar, Toolbar } from "@material-ui/core";

const Footer = () => {
  return (
    <AppBar
      position="fixed"
      style={{ top: "auto", bottom: 0 }}
      color="primary">
      <Toolbar>Footer</Toolbar>
    </AppBar>
  );
};

export default Footer;

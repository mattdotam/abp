import React from "react";
import { Grid, AppBar, Toolbar, withStyles } from "@material-ui/core";
import styles from "../styles/FooterStyles";

const Footer = props => {
  const { classes } = props;
  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      color="primary">
      <Toolbar className={classes.toolBar}>
        Copyright information, social links, privacy policy, etc to go
        here
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Footer);

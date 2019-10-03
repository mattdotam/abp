import React from "react";
import { withRouter, NavLink as RouterLink } from "react-router-dom";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import styles from "../styles/NavBarStyles";

const NavBar = props => {
  const { classes } = props;
  return (
    <AppBar
      className={classes.appBar}
      position="fixed"
      color="primary">
      <Toolbar className={classes.toolBar}>Testing</Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);

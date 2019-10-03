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
import logo from "../bin/abp-logo.png";

const NavBar = props => {
  const { classes } = props;
  return (
    <AppBar
      className={classes.appBar}
      position="fixed"
      color="primary">
      <Toolbar className={classes.toolBar}>
        <Grid justify="space-between" direction="row" container>
          <Grid item>
            <img
              src={logo}
              style={{ height: "92px", width: "auto" }}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);

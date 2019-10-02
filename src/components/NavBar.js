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
} from "@material-ui/core";

const NavBar = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>Testing</Toolbar>
    </AppBar>
  );
};

export default NavBar;

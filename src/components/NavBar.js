import React, { Component } from "react";
import { withRouter, NavLink as RouterLink } from "react-router-dom";
import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import styles from "../styles/NavBarStyles";
import logo from "../bin/abp-logo.png";

const mobileMenuId = "primary-menu-mobile";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileAnchorEl: null,
    };
    this.renderMobileMenu = this.renderMobileMenu.bind(this);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(
      this
    );
  }
  handleMobileMenuOpen(e) {
    this.setState({ mobileAnchorEl: e.currentTarget });
  }
  handleMobileMenuClose(e) {
    if (typeof e.key === "string") {
      if (e.key === "Enter") {
        this.setState({ mobileAnchorEl: null });
      }
    } else {
      this.setState({ mobileAnchorEl: null });
    }
  }
  renderMobileMenu() {
    const { classes } = this.props;
    return (
      <Menu
        anchorEl={this.state.mobileAnchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        open={Boolean(this.state.mobileAnchorEl)}
        onClose={this.handleMobileMenuClose}
        onKeyDown={e => this.handleMobileMenuClose(e)}
        className={classes.mobileMenu}>
        <MenuItem>
          <Link
            variant="body1"
            underline="none"
            className={classes.navLink}
            component={RouterLink}
            to="/"
            onClick={this.handleMobileMenuClose}>
            Browse
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            variant="body1"
            underline="none"
            className={classes.navLink}
            component={RouterLink}
            activeClassName={classes.active}
            to="/about"
            onClick={this.handleMobileMenuClose}>
            About
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            variant="body1"
            underline="none"
            className={classes.navLink}
            component={RouterLink}
            activeClassName={classes.active}
            to="/contact"
            onClick={this.handleMobileMenuClose}>
            Contact
          </Link>
        </MenuItem>
      </Menu>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <AppBar
        className={classes.appBar}
        position="fixed"
        color="primary">
        <Toolbar className={classes.toolBar}>
          <Grid
            justify="space-between"
            alignItems="center"
            direction="row"
            container>
            <Grid item>
              <RouterLink to="/">
                <img
                  src={logo}
                  style={{ height: "96px", width: "auto" }}
                  alt="ArtbyPhotos Logo"
                />
              </RouterLink>
            </Grid>
            <Grid item>
              <div className={classes.sectionDesktop}>
                <Grid spacing={2} direction="row" container>
                  <Grid item>
                    <Link
                      variant="h3"
                      underline="none"
                      className={classes.navLink}
                      component={RouterLink}
                      activeClassName={classes.active}
                      to="/about">
                      About
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      variant="h3"
                      underline="none"
                      className={classes.navLink}
                      component={RouterLink}
                      activeClassName={classes.active}
                      to="/contact">
                      Contact
                    </Link>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={e => this.handleMobileMenuOpen(e)}
                  color="inherit"
                  style={{ padding: "6px", marginRight: "-6px" }}>
                  <div className={classes.navHamburger}>
                    {
                      <Icon
                        style={{ marginTop: "8px" }}
                        size={1}
                        color="white"
                        path={mdiMenu}
                      />
                    }
                  </div>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
        {this.renderMobileMenu()}
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavBar);

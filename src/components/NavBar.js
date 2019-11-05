import React, { Component } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Grid,
  AppBar,
  Toolbar,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  withStyles,
} from "@material-ui/core";
import { GoogleLogout } from "react-google-login";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import styles from "../styles/NavBarStyles";
import logo from "../bin/abp-logo.png";
import Contact from "./Contact";
import axios from "axios";

const mobileMenuId = "primary-menu-mobile";
const adminMenuId = "primary-menu-admin";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileAnchorEl: null,
      adminAnchorEl: null,
      openContact: false,
      contactName: "",
      contactEmail: "",
      contactMessage: "",
      loading: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.renderMobileMenu = this.renderMobileMenu.bind(this);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(
      this
    );
    this.renderAdminMenu = this.renderAdminMenu.bind(this);
    this.handleAdminMenuOpen = this.handleAdminMenuOpen.bind(this);
    this.handleAdminMenuClose = this.handleAdminMenuClose.bind(this);
    this.setOpenContact = this.setOpenContact.bind(this);
    this.handleContactClose = this.handleContactClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }
  setLoading(setting) {
    this.setState({ loading: setting });
  }
  async sendMessage(msg) {
    console.log("sendMessage msg: ", { ...msg });
    await axios.post("/.netlify/functions/message", {
      ...msg,
    });
    this.props.setSnackbarMsg(`Message Sent`);
    return true;
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleContactClose() {
    this.setState({
      contactName: "",
      contactEmail: "",
      contactMessage: "",
    });
  }
  setOpenContact(setting) {
    this.setState({ openContact: setting });
  }
  handleLogout(e) {
    e.preventDefault();
    this.props.clearRole();
    this.props.clearToken();
    this.props.clearAvatar();
    this.handleMobileMenuClose(e);
    this.handleAdminMenuClose(e);
  }
  handleAdminMenuOpen(e) {
    this.setState({ adminAnchorEl: e.currentTarget });
  }
  handleAdminMenuClose(e) {
    if (typeof e.key === "string") {
      if (e.key === "Enter") {
        this.setState({ adminAnchorEl: null });
      }
    } else {
      this.setState({ adminAnchorEl: null });
    }
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
        <MenuItem
          onClick={e => {
            this.setOpenContact(true);
            this.handleMobileMenuClose(e);
          }}>
          <Typography
            variant="body1"
            component="body1"
            underline="none"
            className={[classes.navLink, classes.navLinkDesktop]}
            style={{ cursor: "pointer" }}
            activeClassName={classes.active}>
            Contact
          </Typography>
        </MenuItem>
        {this.props.role === "admin" && <hr />}
        {this.props.role === "admin" && (
          <MenuItem>
            <Link
              variant="body1"
              underline="none"
              className={classes.navAdminLink}
              activeClassName={classes.active}
              component={RouterLink}
              to="/admin"
              onClick={this.handleMobileMenuClose}>
              Manage
            </Link>
          </MenuItem>
        )}
        {this.props.role === "admin" && (
          <MenuItem>
            <GoogleLogout
              clientId="88561498986-54t72qa2e37kslmi3uiblm3gu0te32ev.apps.googleusercontent.com"
              render={renderProps => (
                <Link
                  variant="body1"
                  underline="none"
                  className={classes.navAdminLink}
                  onClick={this.handleLogout}>
                  Logout
                </Link>
              )}
              onLogoutSuccess={e => this.handleLogout}
              onFailure={e => this.handleLogout}></GoogleLogout>
          </MenuItem>
        )}
      </Menu>
    );
  }
  renderAdminMenu() {
    const { classes } = this.props;
    return (
      <Menu
        anchorEl={this.state.adminAnchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        id={adminMenuId}
        keepMounted
        open={Boolean(this.state.adminAnchorEl)}
        onClose={this.handleAdminMenuClose}
        onKeyDown={e => this.handleAdminMenuClose(e)}
        className={classes.mobileMenu}>
        <MenuItem>
          <Link
            variant="body1"
            underline="none"
            className={classes.navAdminLink}
            activeClassName={classes.active}
            component={RouterLink}
            to="/admin"
            onClick={this.handleAdminMenuClose}>
            Manage
          </Link>
        </MenuItem>
        <MenuItem>
          <GoogleLogout
            clientId="88561498986-54t72qa2e37kslmi3uiblm3gu0te32ev.apps.googleusercontent.com"
            render={renderProps => (
              <Link
                variant="body1"
                underline="none"
                className={classes.navAdminLink}
                onClick={this.handleLogout}>
                Logout
              </Link>
            )}
            onLogoutSuccess={e => this.handleLogout}
            onFailure={e => this.handleLogout}></GoogleLogout>
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
          <Contact
            openContact={this.state.openContact}
            setOpenContact={this.setOpenContact}
            handleChange={this.handleChange}
            name={this.state.contactName}
            email={this.state.contactEmail}
            message={this.state.contactMessage}
            sendMessage={this.sendMessage}
            handleContactClose={this.handleContactClose}
            loading={this.state.loading}
            setLoading={this.setLoading}
            setSnackbarMsg={this.props.setSnackbarMsg}
            setSnackbarOpen={this.props.setSnackbarOpen}
          />
          <Grid
            justify="space-between"
            alignItems="center"
            direction="row"
            container>
            <Grid item>
              <RouterLink to="/">
                <img
                  src={logo}
                  style={{ height: "90px", width: "auto" }}
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
                      className={[
                        classes.navLink,
                        classes.navLinkDesktop,
                      ]}
                      component={RouterLink}
                      activeClassName={classes.active}
                      to="/about">
                      About
                    </Link>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h3"
                      underline="none"
                      className={[
                        classes.navLink,
                        classes.navLinkDesktop,
                      ]}
                      style={{ cursor: "pointer" }}
                      activeClassName={classes.active}
                      onClick={() => this.setOpenContact(true)}>
                      Contact
                    </Typography>
                  </Grid>
                  {this.props.avatar !== null && (
                    <Grid item>
                      <Link
                        underline="none"
                        className={classes.navAvatar}
                        onClick={e => this.handleAdminMenuOpen(e)}
                        aria-label="admin controls"
                        aria-controls={adminMenuId}
                        aria-haspopup="true">
                        <img
                          className={classes.navAvatarImg}
                          style={{ cursor: "pointer" }}
                          src={this.props.avatar}
                          alt="avatar"
                        />
                      </Link>
                    </Grid>
                  )}
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
        {this.renderAdminMenu()}
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavBar);

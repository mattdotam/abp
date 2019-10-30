import React, { Component } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Admin from "./Admin";
import ViewTag from "./ViewTag";
import ViewAlbum from "./ViewAlbum";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      role: null,
      avatar: null,
      loading: false,
    };
    this.getToken = this.getToken.bind(this);
    this.setToken = this.setToken.bind(this);
    this.checkToken = this.checkToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
    this.setRole = this.setRole.bind(this);
    this.clearRole = this.clearRole.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
    this.clearAvatar = this.clearAvatar.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }
  componentDidMount() {
    this.getToken();
  }
  getToken() {
    if (window.localStorage.getItem("token")) {
      this.setState(
        {
          token: JSON.parse(window.localStorage.getItem("token")),
          avatar: JSON.parse(window.localStorage.getItem("avatar")),
        },
        () => {
          this.checkToken();
        }
      );
    }
  }
  setLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
  setToken(token) {
    this.setState({ token });
    window.localStorage.setItem("token", JSON.stringify(token));
  }
  checkToken() {
    if (this.state.token !== null) {
      axios
        .post("/.netlify/functions/tokenCheck", {
          token: this.state.token,
        })
        .then(tokenCheck => {
          if (tokenCheck.status === 200) {
            this.setRole(tokenCheck.data);
          } else {
            this.clearRole();
            this.clearAvatar();
            this.clearToken();
          }
        });
    }
  }
  clearToken() {
    this.setState({ token: null });
    window.localStorage.removeItem("token");
  }
  setRole(role) {
    this.setState({ role });
  }
  clearRole() {
    this.setState({ role: null });
  }
  setAvatar(link) {
    this.setState({ avatar: link });
    window.localStorage.setItem("avatar", JSON.stringify(link));
  }
  clearAvatar() {
    this.setState({ avatar: null });
    window.localStorage.removeItem("avatar");
  }
  render() {
    return (
      <Grid direction="column" container>
        <Grid item>
          <NavBar
            avatar={this.state.avatar}
            role={this.state.role}
            clearRole={this.clearRole}
            clearToken={this.clearToken}
            clearAvatar={this.clearAvatar}
          />
        </Grid>
        <Grid item>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  token={this.state.token}
                  loading={this.state.loading}
                  setLoading={this.setLoading}
                />
              )}
            />
            <Route
              exact
              path={["/about", "/about/"]}
              render={() => <About />}
            />
            <Route
              exact
              path={["/contact", "/contact/"]}
              render={() => <Contact />}
            />
            <Route
              exact
              path={["/admin", "/admin/"]}
              render={() => (
                <Admin
                  token={this.state.token}
                  role={this.state.role}
                  setToken={this.setToken}
                  checkToken={this.checkToken}
                  clearRole={this.clearRole}
                  clearToken={this.clearToken}
                  setAvatar={this.setAvatar}
                  loading={this.state.loading}
                  setLoading={this.setLoading}
                />
              )}
            />
            <Route
              exact
              path={["/tag/:tag", "/tag/:tag/"]}
              render={renderProps => (
                <ViewTag
                  {...renderProps}
                  token={this.state.token}
                  loading={this.state.loading}
                  setLoading={this.setLoading}
                />
              )}
            />
            <Route
              exact
              path={["/:album", "/:album/"]}
              render={renderProps => (
                <ViewAlbum
                  {...renderProps}
                  token={this.state.token}
                  loading={this.state.loading}
                  setLoading={this.setLoading}
                />
              )}
            />
            <Route path={["/:album/:photo", "/:album/:photo/"]} />
          </Switch>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    );
  }
}

export default App;

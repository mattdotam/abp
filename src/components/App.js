import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, Switch } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

// class LambdaDemo extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { loading: false, msg: null }
//   }

//   handleClick = api => e => {
//     e.preventDefault()

//     this.setState({ loading: true })
//     fetch("/.netlify/functions/" + api)
//       .then(response => response.json())
//       .then(json => this.setState({ loading: false, msg: json.msg }))
//   }

//   render() {
//     const { loading, msg } = this.state

//     return (
//       <p>
//         <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
//         <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
//         <br />
//         <span>{msg}</span>
//       </p>
//     )
//   }
// }

class App extends Component {
  render() {
    return (
      <Grid direction="column" container>
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
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

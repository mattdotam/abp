import React from "react";
import { Container } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const Admin = props => {
  const responseGoogle = response => {
    props.setCredential(response);
    axios
      .post("/.netlify/functions/authCheck", {
        idToken: String(response.Zi.id_token),
        userid: String(response.googleId),
      })
      .then(authCheck => {
        console.log(authCheck.data);
        // const idToken = response.Zi.id_token;
        // const userid = response.googleId;
        // const expires = response.Zi.expires_at;
        // if (authCheck.data === true) {
        //   window.localStorage.setItem(
        //     "token",
        //     JSON.stringify({ idToken, userid, expires })
        //   );
        //   console.log(window.localStorage.getItem("token"));
        // } else {
        //   window.localStorage.removeItem("token");
        // }
      });
  };
  return (
    <Container maxWidth="lg">
      {props.cred === undefined && (
        <GoogleLogin
          clientId="88561498986-54t72qa2e37kslmi3uiblm3gu0te32ev.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </Container>
  );
};

export default Admin;

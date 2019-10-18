import React from "react";
import { Container } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import axios from "axios";

const Admin = props => {
  const responseGoogle = response => {
    props.setAvatar(response.profileObj.imageUrl);
    if (
      props.token === null &&
      window.localStorage.getItem("token") === null
    ) {
      axios
        .post("/.netlify/functions/authCheck", {
          idToken: String(response.Zi.id_token),
          userid: String(response.googleId),
        })
        .then(authCheck => {
          props.setToken(authCheck.data);
          props.checkToken();
        });
    }
  };
  const logout = () => {
    props.clearRole();
    props.clearToken();
  };
  return (
    <Container maxWidth="lg">
      {props.token === null &&
        window.localStorage.getItem("token") === null && (
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

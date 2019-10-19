import React from "react";
import { Container } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
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
  // Album GET
  const albumGet = albumId => {
    axios
      // .get(`/.netlify/functions/album?id=${albumId}`)
      .get(`/.netlify/functions/album`)
      .then(albumPost => {
        console.log(albumPost.data);
      });
  };
  // Album POST
  const albumPost = albumData => {
    axios
      .post(`/.netlify/functions/album`, {
        ...albumData,
        token: props.token,
      })
      .then(albumPost => {
        console.log(albumPost.data);
      });
  };
  // Album PATCH
  const albumPatch = albumData => {
    axios
      .patch(`/.netlify/functions/album`, {
        ...albumData,
        token: props.token,
      })
      .then(albumPatch => {
        console.log(albumPatch.data);
      });
  };
  // Album DELETE
  const albumDelete = albumData => {
    axios
      .delete(`/.netlify/functions/album`, {
        data: {
          ...albumData,
          token: props.token,
        },
      })
      .then(albumDelete => {
        console.log(albumDelete.data);
      });
  };

  // const albumGet;
  // const albumPatch;
  // const albumDelete;
  // const photoGet = photoId => {
  //   console.log(photoId);
  //   axios
  //     .get(`/.netlify/functions/photo?id=${photoId}`)
  //     .then(photoGet => {
  //       console.log(photoGet.data);
  //     });
  // };
  // const photoPut = () => {
  //   console.log("put");
  // };
  // const photoPost = photoData => {
  // axios
  //   .post(`/.netlify/functions/photo`, {
  //     ...photoData,
  //     token: props.token,
  //   })
  //   .then(photoPost => {
  //     console.log(photoPost.data);
  //   });
  // };
  // const photoDelete = () => {
  //   console.log("delete");
  // };
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
      {props.token !== null && (
        <div>
          <button
            onClick={() =>
              albumPost({
                id: "id12345",
                title: "album title",
                dateStamp: Math.floor(new Date().getTime() / 1000),
                bgImg: "base64 img data",
                description: "I am an album description",
                slug: "album-title",
                photos: ["photoid-12345", "photoid-54321"],
              })
            }>
            Album POST Test
          </button>
          <button onClick={() => albumGet("id12345")}>
            Album GET Test
          </button>
          <button
            onClick={() =>
              albumPatch({
                id: "id12345",
                title: "Patched album title",
                dateStamp: Math.floor(new Date().getTime() / 1000),
                bgImg: "base64 img data",
                description: "I am an album description",
                slug: "patched-album-title",
                photos: ["photoid-12345", "photoid-54321"],
              })
            }>
            Album PATCH Test
          </button>
          <button
            onClick={() =>
              albumDelete({
                id: "id12345",
              })
            }>
            Album DELETE Test
          </button>
          {/* <button onClick={() => photoGet("12345")}>
            Photo GET Test
          </button>
          <button
            onClick={() =>
              photoPost({
                id: "id1234",
                title: "photo title",
                uploadStamp: 1571394869,
                takenStamp: 1570703664,
                album: "No Album",
                tags: ["Tag 1", "Tag 2"],
                photo: "I am base64 photo data",
              })
            }>
            Photo POST Test
          </button>
          <button onClick={photoPut}>Photo PUT Test</button>
          <button onClick={photoDelete}>Photo DELETE Test</button> */}
        </div>
      )}
    </Container>
  );
};

export default Admin;

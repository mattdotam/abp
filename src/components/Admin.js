import React, { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Card,
  Button,
  withStyles,
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import styles from "../styles/AdminStyles";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import uuidv4 from "uuid/v4";
import AddAlbum from "./AddAlbum";

const Admin = props => {
  const { classes } = props;
  const [albums, setAlbums] = useState([]);
  const [addAlbumObject, setAddAlbumObject] = useState({
    id: uuidv4(),
    title: "Album Title",
    dateStamp: Math.floor(new Date().getTime() / 1000),
    description: "Describe your Album",
    slug: "album-title",
    photos: [],
  });
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
  async function getAlbums() {
    await axios.get(`/.netlify/functions/album`).then(albumsList => {
      if (albums.length !== albumsList.data.length) {
        setAlbums(albumsList.data);
      }
    });
  }
  getAlbums();
  // Album GET
  const albumGet = albumId => {
    axios
      // .get(`/.netlify/functions/album?id=${albumId}`)
      .get(`/.netlify/functions/album`)
      .then(albumPost => {});
  };
  // Album POST
  const albumPost = albumData => {
    axios
      .post(`/.netlify/functions/album`, {
        ...albumData,
        token: props.token,
      })
      .then(albumPost => {
        getAlbums();
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
        getAlbums();
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
        getAlbums();
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
      <Paper
        margin={0}
        padding={0}
        className={classes.adminPaper}
        square>
        {props.token === null &&
          window.localStorage.getItem("token") === null && (
            <Grid spacing={1} direction="column">
              <Grid item>
                <GoogleLogin
                  clientId="88561498986-54t72qa2e37kslmi3uiblm3gu0te32ev.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </Grid>
            </Grid>
          )}
        {props.token !== null && (
          <Grid spacing={1} direction="column">
            <Grid item>
              <div>
                <button
                  onClick={() =>
                    albumPost({
                      id: "id12345",
                      title: "album title",
                      dateStamp: Math.floor(
                        new Date().getTime() / 1000
                      ),
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
                      dateStamp: Math.floor(
                        new Date().getTime() / 1000
                      ),
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
              </div>
            </Grid>
            <Grid item>
              <Typography variant="h2" component="h2">
                Albums{" "}
                <span>
                  <AddAlbum
                    addAlbumObject={addAlbumObject}
                    setAddAlbumObject={setAddAlbumObject}
                    albumPost={albumPost}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Grid direction="row" container>
                {albums.map(album => {
                  return (
                    <Grid xs={12} sm={6} md={3} item>
                      <Card className={classes.albumCard} square>
                        <Grid direction="column" container>
                          <Grid item>
                            <Grid
                              direction="row"
                              spacing={1}
                              container>
                              <Grid item>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary">
                                  Edit
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="secondary"
                                  style={{
                                    backgroundColor: red[500],
                                  }}
                                  onClick={() =>
                                    albumDelete({ id: album.id })
                                  }>
                                  Delete
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid
                              direction="row"
                              spacing={1}
                              container>
                              <Grid item>
                                <Typography
                                  variant="h4"
                                  component="h3">
                                  {`${album.title}`}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="body1"
                                  component="span">
                                  {`(${album.dateStamp})`}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default withStyles(styles)(Admin);

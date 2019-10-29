import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan, mdiCameraPlus } from "@mdi/js";
import AddAlbum from "./AddAlbum";
import EditAlbum from "./EditAlbum";
import AddPhoto from "./AddPhoto";

const Admin = props => {
  const { classes } = props;
  const [albums, setAlbums] = useState([]);
  const [addAlbumObject, setAddAlbumObject] = useState({
    id: uuidv4(),
    title: "Album Title",
    dateStamp: Math.floor(new Date().getTime() / 1000),
    description: "Describe your Album",
    slug: "album-title",
  });
  const [editAlbumObject, setEditAlbumObject] = useState({
    id: undefined,
    title: undefined,
    createStamp: undefined,
    dateStamp: undefined,
    description: undefined,
    slug: undefined,
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [addPhotoObject, setAddPhotoObject] = useState({
    id: uuidv4(),
    title: "Photo Title",
    albumId: undefined,
    albumTitle: undefined,
    dateStamp: Math.floor(new Date().getTime() / 1000),
    description: "Photo Description",
    slug: "photo-slug",
    photoData: undefined,
    tags: "",
  });
  const [openAddPhoto, setOpenAddPhoto] = React.useState(false);

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
  const albumPost = async albumData => {
    await axios
      .post(`/.netlify/functions/album`, {
        ...albumData,
        token: props.token,
      })
      .then(albumPost => {
        getAlbums();
        return albumPost;
      });
  };
  // Album PATCH
  const albumPatch = async albumData => {
    await axios
      .patch(`/.netlify/functions/album`, {
        ...albumData,
        token: props.token,
      })
      .then(async albumPatch => {
        await axios
          .get(`/.netlify/functions/album`)
          .then(albumsList => {
            setAlbums(albumsList.data);
          });
      });
  };
  // Album DELETE
  const albumDelete = async albumData => {
    await axios
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
  const photoPost = photoData => {
    axios
      .post(`/.netlify/functions/photo`, {
        ...photoData,
        token: props.token,
      })
      .then(photoPost => {
        console.log(photoPost.data);
      });
  };
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
              <Typography variant="h2" component="h2">
                Albums{" "}
                <span>
                  <AddAlbum
                    addAlbumObject={addAlbumObject}
                    setAddAlbumObject={setAddAlbumObject}
                    albumPost={albumPost}
                    loading={props.loading}
                    setLoading={props.setLoading}
                  />
                  <EditAlbum
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    editAlbumObject={editAlbumObject}
                    setEditAlbumObject={setEditAlbumObject}
                    albumPatch={albumPatch}
                    loading={props.loading}
                    setLoading={props.setLoading}
                  />
                  <AddPhoto
                    openAddPhoto={openAddPhoto}
                    setOpenAddPhoto={setOpenAddPhoto}
                    addPhotoObject={addPhotoObject}
                    setAddPhotoObject={setAddPhotoObject}
                    photoPost={photoPost}
                    loading={props.loading}
                    setLoading={props.setLoading}
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
                                  color="primary"
                                  onClick={() => {
                                    setEditAlbumObject(album);
                                    setOpenEdit(true);
                                  }}>
                                  <Icon
                                    path={mdiPencil}
                                    title="Edit Album"
                                    size={1}
                                    horizontal
                                    vertical
                                    rotate={180}
                                    color="white"
                                  />
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  size="small"
                                  variant="contained"
                                  style={{
                                    backgroundColor: red[500],
                                  }}
                                  onClick={() =>
                                    albumDelete({ id: album.id })
                                  }>
                                  <Icon
                                    path={mdiTrashCan}
                                    title="Delete Album"
                                    size={1}
                                    horizontal
                                    vertical
                                    rotate={180}
                                    color="white"
                                  />
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
                                <Link
                                  className={classes.albumLink}
                                  to={`/${album.slug}`}>
                                  <Typography
                                    variant="h4"
                                    component="h3">
                                    {`${album.title}`}
                                  </Typography>
                                </Link>
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="body1"
                                  component="span">
                                  {`${
                                    new Date(album.dateStamp * 1000)
                                      .toLocaleString()
                                      .split(",")[0]
                                  }`}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="body1"
                                component="span">
                                {`${album.description}`}
                              </Typography>
                            </Grid>
                            <Grid direction="row" container>
                              <Grid item>
                                <Typography
                                  variant="body1"
                                  component="span">
                                  {`${album.length}`}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => {
                                    setAddPhotoObject({
                                      ...addPhotoObject,
                                      albumId: album.id,
                                      albumTitle: album.title,
                                      dateStamp: album.dateStamp,
                                    });
                                    setOpenAddPhoto(true);
                                  }}>
                                  <Icon
                                    path={mdiCameraPlus}
                                    title="Add Photo"
                                    size={1}
                                    horizontal
                                    vertical
                                    rotate={180}
                                    color="white"
                                  />
                                </Button>
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

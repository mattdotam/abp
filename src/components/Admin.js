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
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import styles from "../styles/AdminStyles";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import uuidv4 from "uuid/v4";
import Icon from "@mdi/react";
import {
  mdiPencil,
  mdiTrashCan,
  mdiCameraPlus,
  mdiPolaroid,
} from "@mdi/js";
import AddAlbum from "./AddAlbum";
import EditAlbum from "./EditAlbum";
import AddPhoto from "./AddPhoto";

const Admin = props => {
  const { classes } = props;
  const [albums, setAlbums] = useState(undefined);
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
  const [snackbarShow, setSnackbarShow] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState("Snackbar");

  const [coverPhotos, setCoverPhotos] = React.useState([]);

  let tempPhotos = [];

  const getRandomPhotoFromAlbum = async (albumId, index) => {
    await axios
      .get(
        `/.netlify/functions/photo?albumId=${albumId}&photoData=false`
      )
      .then(async response => {
        if (response.data.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * Math.floor(response.data.length + 1)
          );
          if (response.data[randomIndex] !== undefined) {
            return await axios
              .get(
                `/.netlify/functions/photo?id=${response.data[randomIndex].id}&photoData=true`
              )
              .then(async response => {
                tempPhotos[index] = await response.data[0].photoData;
                if (
                  tempPhotos.length === albums.length &&
                  tempPhotos.length > 0
                ) {
                  if (tempPhotos.includes(undefined) === false) {
                    setCoverPhotos(tempPhotos);
                  }
                }
                return response.data[0].photoData;
              });
          } else {
            return null;
          }
        } else {
          tempPhotos[index] = null;
          return null;
        }
      });
  };

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
      if (
        albums === undefined ||
        albums.length !== albumsList.data.length
      ) {
        setAlbums(albumsList.data);
      }
    });
  }
  if (albums === undefined) {
    setAlbums([]);
    getAlbums();
  }
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
  const albumDelete = async albumData => {
    setSnackbarMsg(`Deleted Album '${albumData.title}'`);
    await axios
      .delete(`/.netlify/functions/album`, {
        data: {
          ...albumData,
          token: props.token,
        },
      })
      .then(albumDelete => {
        setSnackbarShow(true);
        getAlbums();
      });
  };
  const photoPost = async photoData => {
    await axios
      .post(`/.netlify/functions/photo`, {
        ...photoData,
        token: props.token,
      })
      .then(photoPost => {
        getAlbums();
      });
  };
  const handleSnackbarClose = (event, reason) => {
    setSnackbarShow(false);
  };

  return (
    <Container maxWidth="lg">
      <Paper
        margin={0}
        padding={2}
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
              <Typography
                style={{
                  paddingTop: "1rem",
                  paddingLeft: "0.75rem",
                  paddingBottom: "0.5rem",
                }}
                variant="h2"
                component="h2">
                Albums{" "}
                <span>
                  <AddAlbum
                    addAlbumObject={addAlbumObject}
                    setAddAlbumObject={setAddAlbumObject}
                    albumPost={albumPost}
                    loading={props.loading}
                    setLoading={props.setLoading}
                    setSnackbarShow={setSnackbarShow}
                    setSnackbarMsg={setSnackbarMsg}
                  />
                  <EditAlbum
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    editAlbumObject={editAlbumObject}
                    setEditAlbumObject={setEditAlbumObject}
                    albumPatch={albumPatch}
                    loading={props.loading}
                    setLoading={props.setLoading}
                    setSnackbarShow={setSnackbarShow}
                    setSnackbarMsg={setSnackbarMsg}
                  />
                  <AddPhoto
                    openAddPhoto={openAddPhoto}
                    setOpenAddPhoto={setOpenAddPhoto}
                    addPhotoObject={addPhotoObject}
                    setAddPhotoObject={setAddPhotoObject}
                    photoPost={photoPost}
                    loading={props.loading}
                    setLoading={props.setLoading}
                    setSnackbarShow={setSnackbarShow}
                    setSnackbarMsg={setSnackbarMsg}
                  />
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={snackbarShow}
                    ContentProps={{
                      "aria-describedby": "message-id",
                    }}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                    message={
                      <span id="message-id">{`${snackbarMsg}`}</span>
                    }
                  />
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Grid direction="row" container>
                {albums === [] || albums === undefined ? (
                  <CircularProgress color="primary" />
                ) : (
                  albums.map((album, index) => {
                    if (coverPhotos.length < albums.length) {
                      getRandomPhotoFromAlbum(album.id, index);
                    }
                    return (
                      <Grid xs={12} sm={6} md={3} item>
                        <Card className={classes.albumCard} square>
                          <Link
                            className={classes.albumLink}
                            alt={album.title}
                            to={`/${album.slug}`}>
                            <div
                              className={classes.coverPhotoContainer}>
                              {coverPhotos[index] === undefined ? (
                                <CircularProgress color="primary" />
                              ) : coverPhotos[index] === null ? (
                                <span />
                              ) : (
                                <img
                                  className={classes.coverPhoto}
                                  alt={album.title}
                                  src={coverPhotos[index]}
                                />
                              )}
                            </div>
                          </Link>
                          <Grid
                            style={{ padding: "0.4rem" }}
                            direction="column"
                            container>
                            <Grid item>
                              <Grid
                                direction="row"
                                justify="flex-end"
                                spacing={1}
                                className={classes.albumTopButtonRow}
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
                                      albumDelete({
                                        id: album.id,
                                        title: album.title,
                                      })
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
                              <Grid container direction="column">
                                <Grid
                                  direction="row"
                                  style={{
                                    display: "inline",
                                  }}
                                  spacing={1}
                                  container>
                                  <Grid
                                    style={{ display: "inline-flex" }}
                                    item>
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
                                  <Grid
                                    style={{ display: "inline-flex" }}
                                    item>
                                    <Typography
                                      variant="body1"
                                      style={{
                                        verticalAlign: "text-bottom",
                                        fontSize: "0.75rem",
                                      }}
                                      className={classes.albumDate}
                                      component="span">
                                      {`${
                                        new Date(
                                          album.dateStamp * 1000
                                        )
                                          .toLocaleString()
                                          .split(",")[0]
                                      }`}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  style={{ marginBottom: "0.5rem" }}
                                  item>
                                  <Typography
                                    variant="body1"
                                    style={{
                                      color: "rgba(255,255,255,0.75)",
                                    }}
                                    component="span">
                                    {`${album.description}`}
                                  </Typography>
                                </Grid>
                                <Grid
                                  direction="row"
                                  spacing={1}
                                  className={
                                    classes.albumBottomButtonRow
                                  }
                                  alignItems="center"
                                  alignContent="center"
                                  justify="space-between"
                                  container>
                                  <Grid item>
                                    <Grid
                                      alignItems="center"
                                      alignContent="center"
                                      direction="row"
                                      container>
                                      <Grid item>
                                        <Icon
                                          path={mdiPolaroid}
                                          title={`${album.length} Photos in Album`}
                                          style={{
                                            marginTop: "0.25rem",
                                          }}
                                          size={1.25}
                                          horizontal
                                          vertical
                                          rotate={180}
                                          color="white"
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Typography
                                          variant="body1"
                                          style={{
                                            color: "white",
                                            marginLeft: "0.125rem",
                                          }}
                                          component="span">
                                          {`${album.length}`}
                                        </Typography>
                                      </Grid>
                                    </Grid>
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
                          </Grid>
                        </Card>
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default withStyles(styles)(Admin);

import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import styles from "../styles/ViewSingleStyles";
import axios from "axios";
import Display from "./Display";

const ViewSingle = props => {
  const { classes } = props;
  const { params } = props.match;
  const albumRef = params.album;
  const photoRef = params.photo;
  const [album, setAlbum] = useState(props.albumTitle || undefined);
  const [photo, setPhoto] = useState(props.photo || undefined);

  async function getAlbumTitle(albumRef) {
    props.setLoading(true);
    try {
      await axios
        .get(`/.netlify/functions/album?slug=${albumRef}`)
        .then(response => {
          props.setLoading(false);
          setAlbum(response.data);
          getPhotoFromAlbum(photoRef);
        });
    } catch (err) {
      console.log(err);
      setAlbum(null);
    }
  }

  const getPhotoFromAlbum = async photoRef => {
    try {
      props.setLoading(true);
      await axios
        .get(
          `/.netlify/functions/photo?id=${photoRef}&photoData=true`
        )
        .then(response => {
          console.log(response.data);
          setPhoto(response.data);
        });
    } catch (err) {
      setPhoto([]);
    }
  };
  if (photo === undefined) {
    setPhoto("loading");
    getAlbumTitle(albumRef);
  }
  return (
    <div>
      {album === null ? (
        <Container maxWidth="lg">
          <Paper
            margin={0}
            padding={0}
            className={classes.viewAlbumPaper}
            square>
            <Typography variant="h1" component="h1">
              {`404 - No such album '${albumRef}'.`}
            </Typography>
          </Paper>
        </Container>
      ) : photo === undefined ? (
        <Container maxWidth="lg">
          <CircularProgress
            style={{
              width: "5rem",
              height: "5rem",
              position: "absolute",
              top: "45%",
              left: "45%",
            }}
            color="primary"
          />
        </Container>
      ) : photo === "loading" ? (
        <Container maxWidth="lg">
          <CircularProgress
            style={{
              width: "5rem",
              height: "5rem",
              position: "absolute",
              top: "45%",
              left: "45%",
            }}
            color="primary"
          />
        </Container>
      ) : photo.length === 0 ? (
        <Container maxWidth="lg">
          <Paper
            margin={0}
            padding={0}
            className={classes.viewAlbumPaper}
            square>
            <Typography variant="h1" component="h1">
              {`404 - Photo Not Found`}
            </Typography>
          </Paper>
        </Container>
      ) : photo !== undefined ? (
        <Grid direction="column" container>
          <Display
            photosArr={photo}
            singlePhoto={{
              ...photo[0],
              albumSlug: album.slug,
              albumTitle: album.title,
            }}
            token={props.token}
            album={album}
            loading={props.loading}
            setLoading={props.setLoading}
            viewSingle={true}
          />
        </Grid>
      ) : (
        <Container maxWidth="lg">
          <CircularProgress
            style={{
              width: "5rem",
              height: "5rem",
              position: "absolute",
              top: "45%",
              left: "45%",
            }}
            color="primary"
          />
        </Container>
      )}
    </div>
  );
};

export default withStyles(styles)(ViewSingle);

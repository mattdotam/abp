import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import styles from "../styles/ViewAlbumStyles";
import axios from "axios";
import Display from "./Display";

const ViewAlbum = props => {
  const { classes } = props;
  const { params } = props.match;
  const [album, setAlbum] = useState(undefined);
  const [photosArr, setPhotosArr] = useState(undefined);

  const getAlbum = async () => {
    try {
      await axios
        .get(`/.netlify/functions/album?slug=${params.album}`)
        .then(response => {
          setAlbum(response.data);
          getPhotos(response.data.id);
        });
    } catch (err) {
      setAlbum(null);
    }
  };
  if (album === undefined) {
    setAlbum("loading");
    getAlbum();
  }
  const getPhotos = async albumId => {
    try {
      await axios
        .get(
          `/.netlify/functions/photo?albumId=${albumId}&photoData=true`
        )
        .then(response => {
          setPhotosArr(response.data);
        });
    } catch (err) {
      setPhotosArr(null);
    }
  };
  return (
    <div>
      {album === undefined ? (
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
      ) : album === null ? (
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
      ) : photosArr !== undefined ? (
        <Grid direction="column" container>
          <Display
            photosArr={photosArr}
            setPhotosArr={setPhotosArr}
            setAlbum={setAlbum}
            token={props.token}
            album={album}
            loading={props.loading}
            setLoading={props.setLoading}
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

export default withStyles(styles)(ViewAlbum);

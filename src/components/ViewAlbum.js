import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
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

  useEffect(() => {
    if (
      album !== undefined &&
      photosArr !== undefined &&
      photosArr.length < album.length
    ) {
      getPhotos(album.id, photosArr.length);
    }
  }, [album, photosArr]);

  const getAlbum = async () => {
    try {
      await axios
        .get(`/.netlify/functions/album?slug=${params.album}`)
        .then(response => {
          setAlbum(response.data);
          getPhotos(response.data.id, 0, response.data.length);
        });
    } catch (err) {
      setAlbum(null);
    }
  };

  const getPhotos = (albumId, fromIndex) => {
    try {
      axios
        .get(
          `/.netlify/functions/photo?albumId=${albumId}&index=${fromIndex}&batch=6&photoData=true`
        )
        .then(response => {
          if (typeof photosArr === "object") {
            setPhotosArr([...photosArr, ...response.data]);
          } else {
            setPhotosArr([...response.data]);
          }
        });
    } catch (err) {
      setPhotosArr(null);
    }
  };

  if (album === undefined) {
    setAlbum("loading");
    getAlbum();
  }

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

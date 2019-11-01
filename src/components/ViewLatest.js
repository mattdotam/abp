import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import styles from "../styles/ViewLatestStyles";
import axios from "axios";
import Display from "./Display";

const newPhotoArr = [];

const ViewLatest = props => {
  const { classes } = props;
  const [photosArr, setPhotosArr] = useState(undefined);

  async function getAlbumTitle(photoObject, index, length) {
    try {
      await axios
        .get(`/.netlify/functions/album?id=${photoObject.albumId}`)
        .then(response => {
          const photoObjectWithAlbumTitle = {
            ...photoObject,
            albumTitle: response.data.title,
            albumSlug: response.data.slug,
          };
          newPhotoArr.push(photoObjectWithAlbumTitle);
          if (photosArr === undefined) {
            if (
              newPhotoArr.length + length ===
              newPhotoArr.length + index + 1
            ) {
              setPhotosArr(newPhotoArr);
              props.setLoading(false);
              if (length === 6) {
                getPhotosByCreate(newPhotoArr.length);
              }
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  const getPhotosByCreate = async fromIndex => {
    try {
      props.setLoading(true);
      await axios
        .get(
          `/.netlify/functions/photo?sort=latest&batch=6&index=${fromIndex}&photoData=true`
        )
        .then(response => {
          response.data.forEach((photo, index) => {
            getAlbumTitle(photo, index, response.data.length);
          });
        });
    } catch (err) {
      setPhotosArr([]);
    }
  };
  if (photosArr === undefined) {
    setPhotosArr("loading");
    newPhotoArr.length = 0;
    getPhotosByCreate(newPhotoArr.length);
  }
  return (
    <div>
      {photosArr === undefined ? (
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
      ) : photosArr === "loading" ? (
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
      ) : photosArr.length === 0 ? (
        <Container maxWidth="lg">
          <Paper
            margin={0}
            padding={0}
            className={classes.viewAlbumPaper}
            square>
            <Typography variant="h1" component="h1">
              {`404 - No Photos Found`}
            </Typography>
          </Paper>
        </Container>
      ) : photosArr !== undefined ? (
        <Grid direction="column" container>
          <Display
            photosArr={photosArr}
            token={props.token}
            setPhotosArr={setPhotosArr}
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

export default withStyles(styles)(ViewLatest);

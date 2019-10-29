import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import styles from "../styles/ViewAlbumStyles";
import axios from "axios";
import Display from "./Display";

const newPhotoArr = [];

const ViewTag = props => {
  const { classes } = props;
  const { params } = props.match;
  const [photosArr, setPhotosArr] = useState(undefined);

  async function getAlbumTitle(photoObject, index, length) {
    try {
      await axios
        .get(`/.netlify/functions/album?id=${photoObject.albumId}`)
        .then(response => {
          const photoObjectWithAlbumTitle = {
            ...photoObject,
            albumTitle: response.data.title,
          };
          newPhotoArr.push(photoObjectWithAlbumTitle);
          if (newPhotoArr.length === length) {
            setPhotosArr(newPhotoArr);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  const getPhotosByTag = async () => {
    try {
      await axios
        .get(
          `/.netlify/functions/photo?tag=${params.tag}&photoData=true`
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
    getPhotosByTag();
  }
  return (
    <div>
      {photosArr === undefined ? (
        <Container maxWidth="lg">
          <Paper
            margin={0}
            padding={0}
            className={classes.viewAlbumPaper}
            square>
            <Typography variant="h1" component="h1">
              {`Loading`}
            </Typography>
          </Paper>
        </Container>
      ) : photosArr === "loading" ? (
        <Container maxWidth="lg">
          <Paper
            margin={0}
            padding={0}
            className={classes.viewAlbumPaper}
            square>
            <Typography variant="h1" component="h1">
              {`Loading`}
            </Typography>
          </Paper>
        </Container>
      ) : photosArr.length === 0 ? (
        <Container maxWidth="lg">
          <Paper
            margin={0}
            padding={0}
            className={classes.viewAlbumPaper}
            square>
            <Typography variant="h1" component="h1">
              {`404 - No Photos with Tag '${params.tag}'`}
            </Typography>
          </Paper>
        </Container>
      ) : photosArr !== undefined ? (
        <Grid direction="column" container>
          <Display photosArr={photosArr} token={props.token} />
        </Grid>
      ) : (
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1">
            {`Loading`}
          </Typography>
        </Container>
      )}
    </div>
  );
};

export default withStyles(styles)(ViewTag);

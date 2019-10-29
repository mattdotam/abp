import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, withStyles } from "@material-ui/core";
import styles from "../styles/SingleStyles";

const Single = props => {
  const { classes } = props;
  const photo = props.singlePhoto;
  console.log(props.setAlbum);
  return (
    <div
      className={classes.root}
      style={{
        display: `${props.single ? "initial" : "none"}`,
      }}
      onClick={() => {
        props.setSingle(false);
        props.setSinglePhoto(undefined);
      }}>
      <Grid
        direction={`${props.isPortrait ? "column" : "row"}`}
        container>
        <Grid item>
          {photo ? (
            <img src={photo.photoData} alt={photo.title} />
          ) : null}
        </Grid>
        {photo ? (
          <Grid item>
            <Typography
              variant="body1"
              component="p"
              className={
                classes.captionText
              }>{`Title: ${photo.title}`}</Typography>
            <Typography
              variant="body1"
              component="p"
              className={
                classes.captionText
              }>{`Description: ${photo.description}`}</Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.captionText}>
              Album:{" "}
              <Link
                className={classes.captionLink}
                onClick={() => {
                  props.setPhotosArr(undefined);
                  props.setSingle(false);
                  props.setSinglePhoto(undefined);
                  props.setAlbum !== undefined &&
                    props.setAlbum(undefined);
                }}
                to={`/${photo.albumSlug}/`}>{`${photo.albumTitle}`}</Link>
            </Typography>
            {photo.tags ? (
              <Typography
                variant="body1"
                component="p"
                className={classes.captionText}>
                Tags:{" "}
                {photo.tags.map(tag => {
                  return (
                    <Link
                      className={classes.captionLink}
                      onClick={() => {
                        props.setPhotosArr(undefined);
                        props.setSingle(false);
                        props.setSinglePhoto(undefined);
                      }}
                      to={`/tag/${tag}/`}>{`${tag}`}</Link>
                  );
                })}
              </Typography>
            ) : null}
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Single);

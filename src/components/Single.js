import React, { useState, createRef } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Chip,
  Paper,
  withStyles,
} from "@material-ui/core";
import styles from "../styles/SingleStyles";

const Single = props => {
  const { classes } = props;
  const photo = props.singlePhoto;
  const [captionHeight, setCaptionHeight] = useState(0);
  let captionRef = createRef();
  return (
    <div
      className={classes.root}
      style={{
        visibility: `${props.single ? "initial" : "hidden"}`,
      }}
      onClick={() => {
        if (props.viewSingle !== true) {
          props.setSingle(false);
          props.setSinglePhoto(undefined);
          document.body.style.overflow = "auto";
        }
      }}>
      <Grid
        className={classes.singleContainer}
        direction="column"
        container>
        <Grid
          style={{
            maxHeight: `calc(100% - ${captionHeight}px)`,
            width: "inherit",
          }}
          item>
          {photo ? (
            <img
              onLoad={() => {
                setCaptionHeight(
                  captionRef.current.getBoundingClientRect().height
                );
                document.body.style.overflow = "hidden";
              }}
              style={{
                height: "auto",
                maxHeight: "100%",
                width: "auto",
                maxWidth: "100vw",
              }}
              src={photo.photoData}
              alt={photo.title}
            />
          ) : null}
        </Grid>
        {photo ? (
          <Grid ref={captionRef} item>
            <Paper
              margin={0}
              padding={2}
              className={classes.singlePaper}>
              <Typography
                variant="body1"
                component="p"
                className={classes.captionText}
                style={{
                  fontStyle: "italic",
                }}>{`${photo.title}`}</Typography>
              <Typography
                variant="body1"
                component="p"
                className={
                  classes.captionText
                }>{`${photo.description}`}</Typography>
              <Typography
                variant="body1"
                component="p"
                className={classes.captionText}>
                Album:{" "}
                <Link
                  className={classes.captionLink}
                  onClick={() => {
                    if (props.viewSingle !== true) {
                      props.setPhotosArr(undefined);
                      props.setSingle(false);
                      props.setSinglePhoto(undefined);
                      props.setAlbum !== undefined &&
                        props.setAlbum(undefined);
                    }
                  }}
                  to={`/${photo.albumSlug}/`}>{`${photo.albumTitle}`}</Link>
              </Typography>
              {photo.tags ? (
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.captionText}
                  style={{ marginTop: "0.5rem" }}>
                  {photo.tags.map((tag, tagIndex) => {
                    return (
                      <Link
                        className={classes.captionLink}
                        onClick={() => {
                          if (props.viewSingle !== true) {
                            props.setPhotosArr(undefined);
                            props.setSingle(false);
                            props.setSinglePhoto(undefined);
                            props.setAlbum !== undefined &&
                              props.setAlbum(undefined);
                          }
                        }}
                        to={`/tag/${tag}/`}>
                        <Chip
                          color="primary"
                          style={{
                            color: "white",
                            cursor: "pointer",
                            marginRight: "0.5rem",
                          }}
                          key={`chip-${tagIndex}`}
                          label={`${tag}`}
                        />
                      </Link>
                    );
                  })}
                </Typography>
              ) : null}
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Single);

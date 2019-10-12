import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import styles from "../styles/BrowserStyles";

const Browser = props => {
  const {
    classes,
    settings,
    browseRef,
    browseWidth,
    browseHeight,
    single,
  } = props;

  const photosArr = props.photosArr;

  const stackArr = [];
  for (let i = 0; i < settings.stack.number; i++) {
    stackArr.push(
      <Grid
        key={i}
        wrap={`${settings.direction === "row" ? "nowrap" : "wrap"}`}
        direction={settings.direction}
        style={{
          width: settings.stack.width,
          height: settings.stack.height,
          overflowX: settings.overflowX,
          overflowY: settings.overflowY,
        }}
        container>
        {photosArr
          .slice(
            i * Math.floor(photosArr.length / settings.stack.number),
            (i + 1) *
              Math.floor(photosArr.length / settings.stack.number)
          )
          .map((b, j) => {
            return (
              <Grid
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  lineHeight: 0,
                }}
                key={`${i}-${j}`}
                item>
                <img
                  style={{
                    width: settings.imgWidth,
                    height: settings.imgHeight,
                    cursor: "pointer",
                  }}
                  src={`${b.url}`}
                  alt={`${b.title}`}
                  onClick={e => props.handleClick(b)}
                />
              </Grid>
            );
          })}
      </Grid>
    );
  }

  return (
    <Grid
      ref={browseRef}
      className={classes.root}
      style={{
        height: `${browseHeight}`,
        visibility: `${single === undefined ? "visible" : "hidden"}`,
      }}
      direction={settings.direction === "column" ? "row" : "column"}
      container>
      {stackArr.map((a, i) => {
        return a;
      })}
    </Grid>
  );
};

export default withStyles(styles)(Browser);

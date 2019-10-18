import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import styles from "../styles/SingleStyles";

const Single = props => {
  const {
    classes,
    handleClick,
    single,
    browseWidth,
    browseHeight,
  } = props;
  return (
    <Grid
      className={classes.root}
      style={{
        height: `${browseHeight}`,
        width: `${browseWidth}`,
        visibility: `${single === undefined ? "hidden" : "visible"}`,
      }}
      container>
      <Grid className={classes.frame} item>
        {single !== undefined && (
          <Grid
            direction="column"
            className={classes.single}
            container>
            <Grid item>
              <img
                src={`${single.url}`}
                alt={`${single.title}`}
                onClick={e => handleClick(undefined)}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                component="p"
                className={
                  classes.caption
                }>{`${single.title}`}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Single);

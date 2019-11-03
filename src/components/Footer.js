import React, { useState } from "react";
import { AppBar, Toolbar, Grid, withStyles } from "@material-ui/core";
import Icon from "@mdi/react";
import {
  mdiInstagram,
  mdiFacebook,
  mdiTwitter,
  mdiLinkedin,
} from "@mdi/js";
import styles from "../styles/FooterStyles";
import axios from "axios";

const Footer = props => {
  const { classes } = props;
  const social = props.settings;
  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      color="primary">
      <Toolbar className={classes.toolBar}>
        {social !== undefined && (
          <Grid
            direction="row"
            spacing={0.5}
            alignItems="center"
            justify="space-between"
            container>
            <Grid item>
              <Grid direction="row" container>
                {social.instagram !== "" && (
                  <a href={social.instagram}>
                    <Grid item>
                      <Icon
                        path={mdiInstagram}
                        title="Follow Iain on Instagram"
                        size={1.2}
                        horizontal
                        vertical
                        rotate={180}
                        color="#ff8500"
                      />
                    </Grid>
                  </a>
                )}
                {social.facebook !== "" && (
                  <a href={social.facebook}>
                    <Grid item>
                      <Icon
                        path={mdiFacebook}
                        title="Follow Iain on Facebook"
                        size={1.2}
                        horizontal
                        vertical
                        rotate={180}
                        color="#ff8500"
                      />
                    </Grid>
                  </a>
                )}
                {social.twitter !== "" && (
                  <a href={social.twitter}>
                    <Grid item>
                      <Icon
                        path={mdiTwitter}
                        title="Follow Iain on Twitter"
                        size={1.2}
                        horizontal
                        vertical
                        rotate={180}
                        color="#ff8500"
                      />
                    </Grid>
                  </a>
                )}
                {social.linkedin !== "" && (
                  <a href={social.linkedin}>
                    <Grid item>
                      <Icon
                        path={mdiLinkedin}
                        title="Connect with Iain on LinkedIn"
                        size={1.2}
                        horizontal
                        vertical
                        rotate={180}
                        color="#ff8500"
                      />
                    </Grid>
                  </a>
                )}
              </Grid>
            </Grid>
            <Grid className={classes.copyright} item>
              © Iain Stubbs | Website by{" "}
              {
                <a
                  className={classes.linkColor}
                  href="https://matt.am">
                  Matt Bear
                </a>
              }
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Footer);

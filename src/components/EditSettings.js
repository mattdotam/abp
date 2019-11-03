import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "#f0f0f0",
    border: "1px solid #333333",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
    borderRadius: theme.spacing(1),
    outline: "none",
    "& focus": {
      outline: "none",
    },
  },
  fullWidth: {
    minWidth: "100%",
    width: "100%",
  },
}));

export default function EditSettings(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.setOpenSettings(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    props.setLoading(true);
    props.setSnackbarMsg(`Edited Social Links`);
    await props.patchSettings({
      ...props.settings,
    });
    props.setSnackbarShow(true);
    props.setLoading(false);
    handleClose();
  };
  return (
    <span>
      {props.settings && (
        <Modal
          aria-labelledby="edit-social-settings"
          aria-describedby="edit-social-settings"
          open={props.openSettings}
          onClose={handleClose}>
          <Grid
            direction="column"
            style={modalStyle}
            className={classes.paper}
            spacing={1}
            container>
            <Grid className={classes.fullWidth} xs={12} item>
              <Typography variant="h3" component="h2">
                {`Edit Social Links`}
              </Typography>
            </Grid>
            <Grid className={classes.fullWidth} xs={12} item>
              <TextField
                disabled={props.loading}
                id="instagram"
                label="Instagram"
                margin="dense"
                variant="outlined"
                fullWidth={true}
                placeholder="Profile URL"
                value={props.settings.instagram}
                onChange={e =>
                  props.setSettings({
                    ...props.settings,
                    instagram: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid className={classes.fullWidth} xs={12} item>
              <TextField
                disabled={props.loading}
                id="facebook"
                label="Facebook"
                margin="dense"
                variant="outlined"
                fullWidth={true}
                placeholder="Page URL"
                value={props.settings.facebook}
                onChange={e =>
                  props.setSettings({
                    ...props.settings,
                    facebook: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid className={classes.fullWidth} xs={12} item>
              <TextField
                disabled={props.loading}
                id="twitter"
                label="Twitter"
                margin="dense"
                variant="outlined"
                fullWidth={true}
                placeholder="Profile URL"
                value={props.settings.twitter}
                onChange={e =>
                  props.setSettings({
                    ...props.settings,
                    twitter: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid className={classes.fullWidth} xs={12} item>
              <TextField
                disabled={props.loading}
                id="linkedin"
                label="LinkedIn"
                margin="dense"
                variant="outlined"
                fullWidth={true}
                placeholder="Profile URL"
                value={props.settings.linkedin}
                onChange={e =>
                  props.setSettings({
                    ...props.settings,
                    linkedin: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                disabled={props.loading}
                variant="contained"
                color="primary">
                {props.loading ? (
                  <CircularProgress color="primary" />
                ) : (
                  `Update`
                )}
              </Button>
            </Grid>
          </Grid>
        </Modal>
      )}
    </span>
  );
}

import React from "react";
import uuidv4 from "uuid/v4";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

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

export default function EditAlbum(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  // addAlbumObject, setAddAlbumObject

  // const handleOpen = () => {
  //   props.setOpenEdit(true);
  // };

  const handleClose = () => {
    props.setEditAlbumObject({
      id: undefined,
      title: undefined,
      createStamp: undefined,
      dateStamp: undefined,
      description: undefined,
      slug: undefined,
    });
    props.setOpenEdit(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    props.setLoading(true);
    props.setSnackbarMsg(
      `Edited Album '${props.editAlbumObject.title}'`
    );
    await props.albumPatch(props.editAlbumObject);
    props.setEditAlbumObject({
      id: undefined,
      title: undefined,
      createStamp: undefined,
      dateStamp: undefined,
      description: undefined,
      slug: undefined,
    });
    props.setSnackbarShow(true);
    props.setLoading(false);
    handleClose();
  };

  return (
    <span>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.openEdit}
        onClose={handleClose}>
        <Grid
          direction="column"
          style={modalStyle}
          className={classes.paper}
          spacing={1}
          container>
          <Grid className={classes.fullWidth} xs={12} item>
            <Typography
              id="simple-modal-title"
              variant="h3"
              component="h2">
              {`Edit: ${props.editAlbumObject.title}`}
            </Typography>
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              required
              disabled={props.loading}
              id="title"
              label="Title"
              margin="dense"
              variant="outlined"
              className={classes.fullWidth}
              value={props.editAlbumObject.title}
              onChange={e =>
                props.setEditAlbumObject({
                  ...props.editAlbumObject,
                  title: e.target.value,
                })
              }
            />
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                disableToolbar
                required
                variant="inline"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                disabled={props.loading}
                margin="dense"
                id="date-taken"
                label="Date Taken"
                className={classes.fullWidth}
                value={props.editAlbumObject.dateStamp * 1000}
                onChange={date =>
                  props.setEditAlbumObject({
                    ...props.editAlbumObject,
                    dateStamp: Math.floor(date / 1000),
                  })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              required
              disabled={props.loading}
              id="slug"
              label="Slug"
              margin="dense"
              variant="outlined"
              placeholder="./your-album-name"
              className={classes.fullWidth}
              value={props.editAlbumObject.slug}
              onChange={e =>
                props.setEditAlbumObject({
                  ...props.editAlbumObject,
                  slug: e.target.value,
                })
              }
            />
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              required
              disabled={props.loading}
              id="description"
              label="Description"
              margin="dense"
              variant="outlined"
              multiline={true}
              rows="2"
              rowsMax="4"
              className={classes.fullWidth}
              value={props.editAlbumObject.description}
              onChange={e =>
                props.setEditAlbumObject({
                  ...props.editAlbumObject,
                  description: e.target.value,
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
    </span>
  );
}

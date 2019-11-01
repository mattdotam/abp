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
import { DropzoneArea } from "material-ui-dropzone";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Icon from "@mdi/react";
import { mdiTrashCan } from "@mdi/js";
import red from "@material-ui/core/colors/red";

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
  previewImg: {
    maxWidth: "100%",
    maxHeight: "400px",
  },
  removeButton: {
    position: "absolute",
    right: "0.5rem",
    top: "0.5rem",
  },
  fullWidth: {
    minWidth: "100%",
    width: "100%",
  },
}));

export default function AddPhoto(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.setAddPhotoObject({
      id: uuidv4(),
      title: "Photo Title",
      albumId: undefined,
      albumTitle: undefined,
      dateStamp: Math.floor(new Date().getTime() / 1000),
      description: "Photo Description",
      slug: "photo-slug",
      photoData: undefined,
      tags: "",
    });
    props.setOpenAddPhoto(false);
  };

  function handleFileAdd(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = result => {
      props.setAddPhotoObject({
        ...props.addPhotoObject,
        photoData: result.currentTarget.result,
      });
    };
    reader.onerror = err => {
      console.log(err);
    };
  }

  function handleFileRemove() {
    props.setAddPhotoObject({
      ...props.addPhotoObject,
      photoData: undefined,
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    props.setLoading(true);
    props.setSnackbarMsg(
      `Added Photo '${props.addPhotoObject.title}'`
    );
    await props.photoPost({
      ...props.addPhotoObject,
      tags: props.addPhotoObject.tags.split(",").map(el => el.trim()),
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
        open={props.openAddPhoto}
        onClose={handleClose}>
        <Grid
          direction="column"
          style={modalStyle}
          className={classes.paper}
          spacing={1}
          container>
          <Grid className={classes.fullWidth} xs={12} item>
            <Typography variant="h3" component="h2">
              Add New Photo
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
              fullWidth={true}
              value={props.addPhotoObject.title}
              onChange={e =>
                props.setAddPhotoObject({
                  ...props.addPhotoObject,
                  title: e.target.value,
                })
              }
            />
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              required
              disabled={props.loading}
              id="slug"
              label="Slug"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              value={props.addPhotoObject.slug}
              placeholder={`/photo-slug`}
              onChange={e =>
                props.setAddPhotoObject({
                  ...props.addPhotoObject,
                  slug: e.target.value,
                })
              }
            />
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              id="tags"
              disabled={props.loading}
              label="Tags (CSV)"
              margin="dense"
              variant="outlined"
              placeholder="Tag 1, Tag 2"
              fullWidth={true}
              value={props.addPhotoObject.tags}
              onChange={e =>
                props.setAddPhotoObject({
                  ...props.addPhotoObject,
                  tags: e.target.value,
                })
              }
            />
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              disabled
              id="albumTitle"
              label="Album"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              value={props.addPhotoObject.albumTitle}
            />
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                disableToolbar
                required
                disabled={props.loading}
                variant="inline"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                margin="dense"
                id="date-taken"
                label="Date Taken"
                className={classes.fullWidth}
                value={props.addPhotoObject.dateStamp * 1000}
                onChange={date =>
                  props.setAddPhotoObject({
                    ...props.addPhotoObject,
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
              id="description"
              disabled={props.loading}
              label="Description"
              margin="dense"
              variant="outlined"
              multiline={true}
              rows="2"
              rowsMax="4"
              fullWidth={true}
              value={props.addPhotoObject.description}
              onChange={e =>
                props.setAddPhotoObject({
                  ...props.addPhotoObject,
                  description: e.target.value,
                })
              }
            />
          </Grid>
          {props.addPhotoObject.photoData === undefined ? (
            <Grid className={classes.fullWidth} xs={12} item>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                filesLimit={1}
                showPreviews={false}
                showPreviewsInDropzone={false}
                showAlerts={false}
                onChange={file => handleFileAdd(file)}
              />
            </Grid>
          ) : (
            <Grid style={{ position: "relative" }} item>
              <img
                className={classes.previewImg}
                src={`${props.addPhotoObject.photoData}`}
                alt="Upload Preview"
              />
              <Button
                className={classes.removeButton}
                size="small"
                variant="contained"
                style={{
                  backgroundColor: red[500],
                }}
                onClick={() => handleFileRemove()}>
                <Icon
                  path={mdiTrashCan}
                  title="Remove Photo"
                  size={1}
                  horizontal
                  vertical
                  rotate={180}
                  color="white"
                />
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              onClick={handleSubmit}
              disabled={props.loading}
              variant="contained"
              color="primary">
              {props.loading ? (
                <CircularProgress color="primary" />
              ) : (
                `Save & Upload`
              )}
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </span>
  );
}

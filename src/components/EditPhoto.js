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
}));

export default function EditPhoto(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const photo = { ...props.editPhotoObject };

  const handleClose = () => {
    props.setEditPhotoObject({
      id: undefined,
      title: undefined,
      albumId: undefined,
      albumTitle: undefined,
      dateStamp: undefined,
      description: undefined,
      slug: undefined,
      photoData: undefined,
      tags: undefined,
    });
    props.setOpenEditPhoto(false);
    props.setEditPhotoIndex(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(props.editPhotoIndex);
    props.setLoading(true);
    props.setSnackbarMsg(
      `Edited Photo '${props.editPhotoObject.title}'`
    );
    await props.photoPatch({
      ...props.editPhotoObject,
      tags: props.editPhotoObject.tags
        .toString()
        .split(",")
        .map(el => el.trim()),
    });
    let newPhotosArr = props.photosArr;
    newPhotosArr[props.editPhotoIndex] = {
      ...props.editPhotoObject,
      tags: props.editPhotoObject.tags
        .toString()
        .split(",")
        .map(el => el.trim()),
    };
    props.setPhotosArr(newPhotosArr);
    props.setSnackbarShow(true);
    props.setLoading(false);
    handleClose();
  };
  return (
    <span>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.openEditPhoto}
        onClose={handleClose}>
        <Grid
          direction="column"
          style={modalStyle}
          className={classes.paper}
          spacing={1}
          container>
          <Grid item>
            <Typography variant="h3" component="h2">
              {`Edit Photo: ${photo.title}`}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              disabled={props.loading}
              id="title"
              label="Title"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              value={photo.title}
              onChange={e =>
                props.setEditPhotoObject({
                  ...photo,
                  title: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              required
              disabled={props.loading}
              id="slug"
              label="Slug"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              placeholder={`/photo-slug`}
              value={photo.slug}
              onChange={e =>
                props.setEditPhotoObject({
                  ...photo,
                  slug: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              id="tags"
              disabled={props.loading}
              label="Tags (CSV)"
              margin="dense"
              variant="outlined"
              placeholder="Tag 1, Tag 2"
              fullWidth={true}
              value={photo.tags}
              onChange={e =>
                props.setEditPhotoObject({
                  ...photo,
                  tags: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              disabled
              id="albumTitle"
              label="Album"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              value={photo.albumTitle}
            />
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                disableToolbar
                disabled={props.loading}
                required
                variant="inline"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                margin="dense"
                id="date-taken"
                label="Date Taken"
                value={photo.dateStamp * 1000}
                onChange={date =>
                  props.setEditPhotoObject({
                    ...photo,
                    dateStamp: Math.floor(date / 1000),
                  })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
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
              fullWidth={true}
              value={photo.description}
              onChange={e =>
                props.setEditPhotoObject({
                  ...photo,
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

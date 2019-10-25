import React from "react";
import uuidv4 from "uuid/v4";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { mdiFilePlus } from "@mdi/js";
import Icon from "@mdi/react";

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

export default function AddAlbum(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  // addAlbumObject, setAddAlbumObject

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.albumPost(props.addAlbumObject);
    props.setAddAlbumObject({
      id: uuidv4(),
      title: "Album Title",
      dateStamp: Math.floor(new Date().getTime() / 1000),
      description: "Describe your Album",
      slug: "album-title",
    });
    handleClose();
  }

  return (
    <span>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleOpen}>
        <Icon
          path={mdiFilePlus}
          title="Edit"
          size={1}
          horizontal
          vertical
          rotate={180}
          color="white"
        />
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>
        <Grid
          direction="column"
          style={modalStyle}
          className={classes.paper}
          spacing={1}
          container>
          <Grid item>
            <Typography variant="h3" component="h2">
              Add New Album
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              id="title"
              label="Title"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              value={props.addAlbumObject.title}
              onChange={e =>
                props.setAddAlbumObject({
                  ...props.addAlbumObject,
                  title: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                disableToolbar
                required
                variant="inline"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                margin="dense"
                id="date-taken"
                label="Date Taken"
                value={props.addAlbumObject.dateStamp * 1000}
                onChange={date =>
                  props.setAddAlbumObject({
                    ...props.addAlbumObject,
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
              id="slug"
              label="Slug"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              placeholder="./your-album-name"
              value={props.addAlbumObject.slug}
              onChange={e =>
                props.setAddAlbumObject({
                  ...props.addAlbumObject,
                  slug: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="description"
              label="Description"
              margin="dense"
              variant="outlined"
              multiline={true}
              rows="2"
              rowsMax="4"
              fullWidth={true}
              value={props.addAlbumObject.description}
              onChange={e =>
                props.setAddAlbumObject({
                  ...props.addAlbumObject,
                  description: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </span>
  );
}

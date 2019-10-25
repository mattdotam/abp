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

  function handleSubmit(e) {
    e.preventDefault();
    props.albumPatch(props.editAlbumObject);
    props.setEditAlbumObject({
      id: undefined,
      title: undefined,
      createStamp: undefined,
      dateStamp: undefined,
      description: undefined,
      slug: undefined,
    });
    handleClose();
  }

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
          <Grid item>
            <Typography
              id="simple-modal-title"
              variant="h3"
              component="h2">
              {`Edit: ${props.editAlbumObject.title}`}
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
              value={props.editAlbumObject.title}
              onChange={e =>
                props.setEditAlbumObject({
                  ...props.editAlbumObject,
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
          <Grid item>
            <TextField
              required
              id="slug"
              label="Slug"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              placeholder="./your-album-name"
              value={props.editAlbumObject.slug}
              onChange={e =>
                props.setEditAlbumObject({
                  ...props.editAlbumObject,
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

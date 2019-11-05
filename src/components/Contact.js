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

export default function Contact(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.handleContactClose();
    props.setOpenContact(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    props.setLoading(true);
    await props.sendMessage({
      name: props.name,
      email: props.email,
      message: props.message,
    });
    props.setSnackbarOpen(true);
    props.setLoading(false);
    handleClose();
  };

  return (
    <span>
      <Modal
        aria-labelledby="contact-form"
        aria-describedby="send-message-to-iain"
        open={props.openContact}
        onClose={handleClose}>
        <Grid
          direction="column"
          style={modalStyle}
          className={classes.paper}
          spacing={1}
          container>
          <Grid className={classes.fullWidth} xs={12} item>
            <Typography variant="h3" component="h2">
              {`Contact Iain`}
            </Typography>
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              required
              tabIndex="1"
              disabled={props.loading}
              id="contactName"
              label="Name"
              margin="dense"
              variant="outlined"
              className={classes.fullWidth}
              placeholder="Your Name"
              value={props.name}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              required
              tabIndex="2"
              disabled={props.loading}
              id="contactEmail"
              label="Email"
              margin="dense"
              variant="outlined"
              className={classes.fullWidth}
              placeholder="Your Email"
              value={props.email}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid className={classes.fullWidth} xs={12} item>
            <TextField
              required
              tabIndex="3"
              id="contactMessage"
              label="Message"
              margin="dense"
              variant="outlined"
              placeholder="Your Message"
              className={classes.fullWidth}
              multiline={true}
              disabled={props.loading}
              rows="6"
              rowsMax="10"
              value={props.message}
              onChange={props.handleChange}
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
                `Send`
              )}
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </span>
  );
}

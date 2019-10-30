const styles = theme => ({
  root: {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundColor: "#222222",
  },
  singlePaper: {
    backgroundColor: "#333333",
    color: "white",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
  captionText: {
    color: "white",
  },
  captionLink: {
    color: "#ff8500 !important",
    textDecoration: "none",
  },
});

export default styles;

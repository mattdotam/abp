const styles = theme => ({
  root: {
    position: "fixed",
    width: "100%",
    height: "inherit",
    backgroundColor: "#222222",
  },
  singleContainer: {
    display: "flex",
    flexWrap: "nowrap",
    width: "min-content",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    letterSpacing: 0,
    lineHeight: 0,
  },
  singlePaper: {
    backgroundColor: "#333333",
    color: "white",
    padding: theme.spacing(2),
    borderRadius: 0,
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

const styles = theme => ({
  adminPaper: {
    backgroundColor: "#333333",
    color: "white",
  },
  albumCard: {
    backgroundColor: "#444444",
    color: "white",
    margin: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.shadows[3],
    minHeight: "128px",
  },
  coverPhotoContainer: {
    maxWidth: "100%",
    height: "150px",
    overflowY: "hidden",
    backgroundColor: "#ff8500",
  },
  coverPhoto: {
    width: "100%",
    height: "auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
  },
  albumTopButtonRow: {
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
    paddingRight: "0.25rem",
  },
  albumBottomButtonRow: {
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
    paddingRight: "0.25rem",
  },
  albumLink: {
    color: "white",
    textDecoration: "none",
  },
  albumDate: {
    color: "white",
  },
});

export default styles;

const styles = theme => ({
  adminPaper: {
    backgroundColor: "#333333",
    color: "white",
  },
  albumCard: {
    backgroundColor: "#444444",
    color: "white",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.shadows[3],
    minHeight: "128px",
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

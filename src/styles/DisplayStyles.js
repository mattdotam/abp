const styles = theme => ({
  root: {
    position: "absolute",
    top: "96px",
    width: "100%",
    height: "calc(100vh - 144px)",
  },
  containerRow: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  containerCol: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  photoItem: {
    margin: 0,
    padding: 0,
    lineHeight: 0,
  },
});

export default styles;

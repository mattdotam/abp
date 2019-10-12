const styles = theme => ({
  root: {
    position: "fixed",
    top: "96px",
    height: "calc(100% - 96px)",
    maxHeight: "calc(100% - 144px)",
  },
  frame: {
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  single: {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    width: "auto",
    height: "auto",
    "& img": {
      cursor: "pointer",
      maxWidth: "100vw",
      maxHeight: "calc(100vh - 226px)",
    },
  },
  caption: {
    color: "white",
    padding: "0rem 1rem",
  },
});

export default styles;

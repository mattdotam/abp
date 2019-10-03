import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { Grid, withStyles } from "@material-ui/core";
import styles from "../styles/BrowserStyles";

function getBrowserSettings(width, height) {
  const direction = width >= height ? "row" : "column";
  const stack =
    direction === "column"
      ? Math.floor(width / 600) + 1
      : Math.floor(height / 400) + 1;

  const overflowX = direction === "column" ? "hidden" : "visible";
  const overflowY = direction === "row" ? "visible" : "hidden";

  let stackHeight;
  let stackWidth;

  if (direction === "column") {
    stackHeight = "auto";
    stackWidth = width / stack;
  } else {
    stackWidth = "auto";
    stackHeight = height / stack;
  }

  const imgWidth = direction === "column" ? stackWidth : "auto";
  const imgHeight = direction === "row" ? stackHeight : "auto";

  return {
    direction,
    overflowX,
    overflowY,
    imgWidth,
    imgHeight,
    stack: {
      number: stack,
      height: stackHeight,
      width: stackWidth,
    },
  };
}

const Browser = props => {
  const { classes } = props;
  const browseRef = useRef(null);
  const [browseHeight, setBrowseHeight] = useState({});
  const [browseWidth, setBrowseWidth] = useState({});
  // Viewport
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleViewportSizeChange = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleViewportSizeChange);
    return () => {
      window.removeEventListener("resize", handleViewportSizeChange);
    };
  }, []);
  // Browser
  useLayoutEffect(() => {
    if (browseWidth >= 600) {
      setBrowseHeight(
        browseRef.current.getBoundingClientRect().height - 96
      );
    } else {
      setBrowseHeight(
        browseRef.current.getBoundingClientRect().height - 112
      );
    }
  }, [browseRef.current, size]);
  useLayoutEffect(() => {
    setBrowseWidth(browseRef.current.getBoundingClientRect().width);
  }, [browseRef.current, size]);

  const settings = getBrowserSettings(browseWidth, browseHeight);

  const photosArr = props.photosArr;

  const stackArr = [];
  for (let i = 0; i < settings.stack.number; i++) {
    stackArr.push(
      <Grid
        key={i}
        wrap={`${settings.direction === "row" ? "nowrap" : "wrap"}`}
        style={{
          width: settings.stack.width,
          height: settings.stack.height,
          overflowX: settings.overflowX,
          overflowY: settings.overflowY,
        }}
        container>
        {photosArr
          .slice(
            i * Math.floor(photosArr.length / settings.stack.number),
            (i + 1) *
              Math.floor(photosArr.length / settings.stack.number)
          )
          .map((b, j) => {
            return (
              <Grid
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                key={`${i}-${j}`}
                item>
                <img
                  style={{
                    width: settings.imgWidth,
                    height: settings.imgHeight,
                  }}
                  src={`${b}`}
                  alt={`${b}`}
                />
              </Grid>
            );
          })}
      </Grid>
    );
  }

  return (
    <Grid
      ref={browseRef}
      className={classes.root}
      style={{ height: `${browseHeight}` }}
      container>
      <Grid item>
        <Grid wrap="nowrap" direction={settings.direction}>
          {stackArr.map((a, i) => {
            return a;
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Browser);

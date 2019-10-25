import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { Grid } from "@material-ui/core";
import Browser from "./Browser";
import Single from "./Single";
import getBrowserSettings from "../helpers/getBrowserSettings";

const photosArr = [];
for (let i = 0; i < 30; i++) {
  photosArr.push({
    url: `https://picsum.photos/${600 +
      Math.floor(Math.random() * 600)}/${600 +
      Math.floor(Math.random() * 600)}`,
    title: "Photo name",
  });
}

const Home = () => {
  const [single, setSingle] = useState(undefined);
  const handleClick = photo => {
    setSingle(photo);
  };
  const browseRef = useRef(null);
  const [browseHeight, setBrowseHeight] = useState({});
  const [browseWidth, setBrowseWidth] = useState({});
  // Viewport
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log(browseRef);

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
        browseRef.current.getBoundingClientRect().height - 48
      );
    } else {
      setBrowseHeight(
        browseRef.current.getBoundingClientRect().height - 48
      );
    }
  }, [browseRef.current, size]);
  useLayoutEffect(() => {
    setBrowseWidth(browseRef.current.getBoundingClientRect().width);
  }, [browseRef.current, size]);

  const settings = getBrowserSettings(browseWidth, browseHeight);

  return (
    <Grid direction="column" container>
      <Grid item>
        <Browser
          photosArr={photosArr}
          handleClick={handleClick}
          single={single}
          settings={settings}
          browseRef={browseRef}
          browseWidth={browseWidth}
          browseHeight={browseHeight}
        />
        <Single
          handleClick={handleClick}
          browseWidth={browseWidth}
          browseHeight={browseHeight}
          single={single}
        />
      </Grid>
    </Grid>
  );
};

export default Home;

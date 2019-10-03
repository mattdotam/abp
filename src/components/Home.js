import React from "react";
import { Grid } from "@material-ui/core";
import Browser from "./Browser";

const Home = () => {
  const photosArr = [];
  for (let i = 0; i < 30; i++) {
    photosArr.push(
      `https://picsum.photos/${600 +
        Math.floor(Math.random() * 600)}/${600 +
        Math.floor(Math.random() * 600)}`
    );
  }
  return (
    <Grid direction="column" container>
      <Grid item>
        <Browser photosArr={photosArr} />
      </Grid>
    </Grid>
  );
};

export default Home;

import React from "react";
import { Grid } from "@material-ui/core";
import Browser from "./Browser";

const Home = () => {
  return (
    <Grid direction="column" container>
      <Grid item>
        <Browser />
      </Grid>
    </Grid>
  );
};

export default Home;

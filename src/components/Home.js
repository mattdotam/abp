import React from "react";
import ViewLatest from "./ViewLatest";

const Home = props => {
  return (
    <ViewLatest
      token={props.token}
      loading={props.loading}
      setLoading={props.setLoading}
    />
  );
};

export default Home;

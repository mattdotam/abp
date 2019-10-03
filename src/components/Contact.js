import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";

const Contact = () => {
  return (
    <Container maxWidth="lg">
      <Grid direction="column">
        <Typography
          style={{ color: "white" }}
          variant="h1"
          component="h1">
          Contact Iain
        </Typography>
        <Typography
          style={{ color: "white", marginBottom: "1rem" }}
          variant="body1"
          component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </Typography>
        <Typography
          style={{ color: "white", marginBottom: "1rem" }}
          variant="body1"
          component="p">
          Integer enim neque volutpat ac tincidunt vitae semper quis
          lectus. Enim sit amet venenatis urna. Elit at imperdiet dui
          accumsan. Pretium lectus quam id leo in vitae turpis.
          Vehicula ipsum a arcu cursus vitae congue. Donec ac odio
          tempor orci dapibus ultrices in iaculis nunc. Fames ac
          turpis egestas maecenas pharetra. Aliquet bibendum enim
          facilisis gravida neque convallis a cras semper. Habitant
          morbi tristique senectus et netus et malesuada. Sed pulvinar
          proin gravida hendrerit. Pharetra magna ac placerat
          vestibulum lectus mauris ultrices eros in. Non diam
          phasellus vestibulum lorem. Leo duis ut diam quam nulla
          porttitor massa id. Aliquam purus sit amet luctus venenatis
          lectus. Magna sit amet purus gravida quis. Enim nunc
          faucibus a pellentesque sit.
        </Typography>
      </Grid>
    </Container>
  );
};

export default Contact;

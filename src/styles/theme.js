import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          height: "100vh",
          backgroundColor: "#222222",
        },
      },
    },
  },
});

export default theme;

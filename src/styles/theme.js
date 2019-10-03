import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff8500",
      dark: "#ff7000",
    },
    secondary: {
      main: "#0776a0",
      dark: "#066488",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#222222",
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#ffffff",
      },
    },
    MuiButton: {
      root: {
        textDecoration: "none",
      },
    },
    MuiContainer: {
      root: {
        marginTop: "120px",
        marginBottom: "64px",
      },
    },
    MuiTypography: {
      h1: {
        fontSize: "2.225rem",
        lineHeight: 1.17,
        letterSpacing: "0.00735em",
        marginTop: "1rem",
        fontWeight: 400,
      },
      h2: {
        fontSize: "2rem",
        lineHeight: 1.17,
        letterSpacing: "0.00755em",
        marginTop: "0.85rem",
        fontWeight: 400,
      },
      h3: {
        fontSize: "1.775rem",
        lineHeight: 1.17,
        letterSpacing: "0.00775em",
        marginTop: "0.5rem",
        fontWeight: 400,
      },
      h4: {
        fontSize: "1.225rem",
        lineHeight: 1.17,
        letterSpacing: "0.00775em",
        fontWeight: 300,
      },
      body1: {
        color: "#333437",
        fontSize: "1rem",
        fontWeight: 400,
        "& a": {
          color: "#0776a0",
          "&:hover": {
            color: "#2980b9",
          },
        },
      },
    },
  },
});

export default theme;

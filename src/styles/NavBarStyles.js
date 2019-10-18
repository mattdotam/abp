const styles = theme => ({
  appBar: {
    top: 0,
    bottom: "auto",
  },
  toolBar: {
    height: "96px",
    minHeight: "96px",
  },
  navLink: {
    textDecoration: "none",
    color: "#333437",
    fontWeight: 400,
    opacity: 0.75,
    transition: "opacity 150ms",
    "&:hover": {
      transition: "opacity 150ms",
      opacity: 1,
    },
  },
  navLinkDesktop: {
    display: "flex",
    margin: 0,
    justifySelf: "center",
    alignSelf: "center",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
  },
  navAdminLink: {
    textDecoration: "none",
    color: "#333437",
    fontWeight: 400,
    opacity: 0.75,
    transition: "opacity 150ms",
    "&:hover": {
      transition: "opacity 150ms",
      opacity: 1,
    },
  },
  navAvatarImg: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  active: {
    color: "#ff8500",
    opacity: 1,
    transition: "color 150ms",
    "&hover": {
      color: "#2980b9",
      transition: "color 150ms",
    },
  },
  navHamburger: {
    backgroundColor: "#ff8500",
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: "5px",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: "#ff7000",
    },
    "&:active": {
      backgroundColor: "#ff7000",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mobileMenu: {
    "& div": {
      backgroundColor: "#ffffff",
    },
  },
});

export default styles;

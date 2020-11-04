import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    padding: `0rem 6rem`,
    [theme.breakpoints.down("md")]: {
      padding: `0rem 2rem`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: 900,
    fontSize: 20,
    color: "#fff",
  },
  name: {
    fontWeight: 900,
    color: "#fff",
    fontSize: 16,
  },
  flexGrow: {
    flexGrow: 1,
  },
  icon: {
    color: "#fff",
    fontSize: 25,
  },
}));

const MyAppBar = ({ logoutUser, user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} color="secondary" position="static">
        <Toolbar>
          <Typography color="inherit" variant="h2" className={classes.title}>
            Retro Sprint
          </Typography>
          <div className={classes.flexGrow} />
          <Typography variant="h6" className={classes.name}>
            {user && user.username}
          </Typography>
          <IconButton>
            <ExitToAppIcon onClick={logoutUser} className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyAppBar;

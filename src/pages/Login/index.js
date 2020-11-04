import React from "react";
import { connect } from "react-redux";
import { AuthLayout } from "../../layouts";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

import LoginForm from "./components/LoginForm";
import { LoginImage } from "../../constants";
import "./styles.scss";
import { authActions } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { lightBlue } from "@material-ui/core/colors";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    borderRadius: 20,
    boxShadow: `0px 5px 30px -2px ${lightBlue[200]}`,
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      padding: "4rem 0",
    },
  },
  loginContainer: {
    display: "grid",
    placeItems: "center",
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  title: {
    fontWeight: 900,
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
    },
  },
}));

const LoginPage = (props) => {
  const {
    isAuthenticated,
    loadUser,
    loginUser,
    clearMessage,
    err,
    msg,
  } = props;
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    clearMessage();
  }, [clearMessage]);

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  React.useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
    if (err) {
      if (err === "Unauthorized, no token provided") return;
      toast.error(err);
    }
  }, [msg, err]);

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  return (
    <AuthLayout>
      <Container maxWidth="md" className={"LoginPage " + classes.root}>
        <Grid className={classes.form} container>
          <Grid className={classes.image} item xs={12} md={6} spacing={2}>
            <div className="image-wrapper">
              <img src={LoginImage} alt="" />
            </div>
          </Grid>
          <Grid
            className={classes.loginContainer}
            xs={12}
            md={6}
            spacing={2}
            item
          >
            <Typography
              className={classes.title}
              align="center"
              color="primary"
              variant="h2"
            >
              WELCOME BACK
            </Typography>
            <LoginForm loginUser={loginUser} />
          </Grid>
        </Grid>
      </Container>
    </AuthLayout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  msg: state.auth.msg,
  err: state.auth.err,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
  loginUser: ({ email, password }) =>
    dispatch(authActions.login({ email, password })),
  clearMessage: () => dispatch(authActions.clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

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
import { Loader } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    borderRadius: 20,
    boxShadow: `0px 5px 30px -2px ${lightBlue[200]}`,
    overflow: "hidden",
    padding: "1rem 0",
    [theme.breakpoints.down("md")]: {
      padding: "4rem 0",
    },
  },
  loginContainer: {
    display: "grid",
    placeItems: "center",
  },
  imageWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  title: {
    fontWeight: 900,
    fontSize: 30,
    marginTop: theme.spacing(1),
    textTransform: "capitalize",
    [theme.breakpoints.down("md")]: {
      fontSize: 26,
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
    googleSignIn,
    facebookSignIn,
    authLoading
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
      {authLoading && <Loader />}
      <Container maxWidth="md" className={"LoginPage " + classes.root}>
        <Grid className={classes.form} container>
          <Grid className={classes.image} item xs={12} md={6} spacing={2}>
            <div className={classes.imageWrapper}>
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
              variant="body1"
            >
              welcome back
            </Typography>
            <LoginForm
              facebookSignIn={facebookSignIn}
              googleSignIn={googleSignIn}
              loginUser={loginUser}
            />
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
  authLoading: state.auth.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
  loginUser: ({ email, password }) =>
    dispatch(authActions.login({ email, password })),
  googleSignIn: (body) => dispatch(authActions.googleSignIn(body)),
  facebookSignIn: (body) => dispatch(authActions.facebookSignIn(body)),
  clearMessage: () => dispatch(authActions.clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

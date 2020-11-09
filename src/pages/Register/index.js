import React from "react";
import { connect } from "react-redux";
import { AuthLayout } from "../../layouts";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

import RegisterForm from "./components/RegisterForm";
import { RegisterImage } from "../../constants";
import "./styles.scss";
import { authActions } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { lightBlue } from "@material-ui/core/colors";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    borderRadius: 20,
    // boxShadow: theme.shadows[20],
    overflow: "hidden",
    boxShadow: `0px 5px 30px -2px ${lightBlue[200]}`,
    [theme.breakpoints.down("md")]: {
      padding: "4rem 0",
    },
  },
  registerContainer: {
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
    textTransform: "capitalize",
    fontSize: 28,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      fontSize: 26,
    },
  },
}));

const RegisterPage = (props) => {
  const {
    loadUser,
    registerUser,
    isAuthenticated,
    err,
    msg,
    isLoading,
  } = props;
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  React.useEffect(() => {
    if (msg) {
      toast.success(msg + "\nRedirect to login after 5 seconds");
      // setTimeout(() => {
      //   history.push("/login");
      // }, 5000);
      // return () => {
      //   clearTimeout();
      // };
    }
    if (err) {
      if (err === "Unauthorized, no token provided") return;
      toast.error(err);
    }
  }, [msg, err]);

  return (
    <AuthLayout>
      <Container maxWidth="md" className={"RegisterPage " + classes.root}>
        <Grid className={classes.form} container>
          <Grid className={classes.image} item xs={12} md={6} spacing={2}>
            <div className="image-wrapper">
              <img src={RegisterImage} alt="" />
            </div>
          </Grid>
          <Grid
            className={classes.registerContainer}
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
              register now
            </Typography>
            <RegisterForm isLoading={isLoading} registerUser={registerUser} />
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
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
  registerUser: ({ username, email, password }) =>
    dispatch(authActions.register({ username, email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { MainLayout } from "../../layouts";
import { authActions } from "../../redux/actions";
import { toast } from "react-toastify";
import ProfileForm from './components/ProfileForm'
import "./styles.scss";

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: "50rem",
    height: "100%",
    paddingTop: theme.spacing(5)
  }
}))

const Profile = (props) => {
  const classes = useStyles()

  const { isAuthenticated, loadUser, logoutUser, user, changeProfile, msg, err } = props;
  const history = useHistory();

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
    loadUser();
  }, [history, isAuthenticated, loadUser]);


  React.useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
    if (err) {
      if (err === "Unauthorized, no token provided") return;
      toast.error(err);
    }
  }, [msg, err]);

  return (

    <MainLayout user={user} logoutUser={logoutUser}>
      <div className="ProfilePage">
        <Container className={classes.container} maxWidth="md">
          <Box component="div">
            {user ?
              <ProfileForm changeProfile={changeProfile} user={user} /> : null
            }
          </Box>
        </Container>
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  msg: state.auth.msg,
  err: state.auth.err,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
  logoutUser: () => dispatch(authActions.logoutUser()),
  changeProfile: ({ username, password }) => dispatch(authActions.updateProfile({ username, password })),

});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

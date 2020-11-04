import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { MainLayout } from "../../layouts";
import { authActions } from "../../redux/actions";

const Profile = (props) => {
  const { isAuthenticated, loadUser, logoutUser, user } = props;
  const history = useHistory();

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
    loadUser();
  }, [isAuthenticated, loadUser]);

  return (
    <MainLayout user={user} logoutUser={logoutUser}>
      <div className="HomePage"></div>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
  logoutUser: () => dispatch(authActions.logoutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

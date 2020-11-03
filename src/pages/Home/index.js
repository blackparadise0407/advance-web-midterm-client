import React from "react";
import { Container, makeStyles } from "@material-ui/core";

import { MainLayout } from "../../layouts";
import { boardApi } from "../../apis";

import { connect } from "react-redux";

import { authActions } from "../../redux/actions";
import tokenConfig from "../../helpers/tokenConfig";
import { useHistory } from "react-router-dom";
import BoardTable from "./components/BoardTable";

import "./styles.scss";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1, 2)
  }
}))

const HomePage = (props) => {
  const { loadUser, token, isAuthenticated } = props;
  const history = useHistory();
  const [userBoard, setUserBoard] = React.useState({
    isLoading: false,
    err: null,
    data: null,
  });

  const _fetchUserBoard = async () => {
    try {
      setUserBoard({
        ...userBoard,
        isLoading: true,
        err: null,
      });
      const config = tokenConfig(token);
      const { data } = await boardApi.getAll(config);
      setUserBoard({
        ...userBoard,
        isLoading: false,
        data,
      });
    } catch (error) {
      setUserBoard({
        ...userBoard,
        isLoading: false,
        err: error.response.data.message || error,
      });
    }
  };
  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
    loadUser();
    _fetchUserBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loadUser]);
  const { data } = userBoard;
  const classes = useStyles()
  return (
    <MainLayout>
      <div className="HomePage">
        <Container className={classes.container} maxWidth="lg">
          <BoardTable rows={data} />
        </Container>
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

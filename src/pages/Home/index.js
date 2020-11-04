import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import { MainLayout } from "../../layouts";
import { boardApi } from "../../apis";

import { connect } from "react-redux";

import { authActions } from "../../redux/actions";
import tokenConfig from "../../helpers/tokenConfig";
import { useHistory } from "react-router-dom";
import BoardTable from "./components/BoardTable";
import CreateBoard from "./components/CreateBoard";
import { findIndex } from "lodash";
import { blue } from "@material-ui/core/colors";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "grid",
    placeItems: "center",
  },
  box: {
    "&> * + *": {
      marginTop: "2rem",
    },
    width: "100%",
    padding: theme.spacing(4, 6),
    borderRadius: 10,
    boxShadow: `0px 5px 30px -5px ${blue[200]}`,
  },
}));

const HomePage = (props) => {
  const { loadUser, token, isAuthenticated, logoutUser, user } = props;
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

  const _handleDeleteRow = (id) => {
    const newUserBoard = { ...userBoard };
    newUserBoard.data.splice(
      findIndex(newUserBoard.data, (item) => item._id === id),
      1
    );
    setUserBoard(newUserBoard);
  };

  const _handleAddRow = (row) => {
    const newUserBoard = { ...userBoard };
    newUserBoard.data = [...newUserBoard.data, row];
    setUserBoard(newUserBoard);
  };

  const _handleUpdateRow = (row) => {
    const newUserBoard = { ...userBoard };
    newUserBoard.data.splice(
      findIndex(newUserBoard.data, (item) => item._id === row._id),
      1,
      row
    );
    setUserBoard(newUserBoard);
    console.log(newUserBoard);
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
  const classes = useStyles();
  return (
    <MainLayout user={user} logoutUser={logoutUser}>
      <div className="HomePage">
        <Container className={classes.container} maxWidth="lg">
          <Box component="div" className={classes.box}>
            <CreateBoard token={token} handleAddRow={_handleAddRow} />
            <BoardTable
              handleUpdateRow={_handleUpdateRow}
              handleDeleteRow={_handleDeleteRow}
              rows={data}
              token={token}
            />
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
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
  logoutUser: () => dispatch(authActions.logoutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

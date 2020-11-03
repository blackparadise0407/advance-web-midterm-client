import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";

import { MainLayout } from "../../layouts";
import { authApi, boardApi } from "../../apis";
import { isEmpty, map } from "lodash";
import CustomCard from "./components/Card";
import "./styles.scss";
import { connect } from "react-redux";
import { MyAppBar } from "../../components";
import Drawer from "../../components/Drawer";
import { authActions } from "../../redux/actions";
import tokenConfig from "../../helpers/tokenConfig";
import { useHistory } from "react-router-dom";
import BoardTable from "./components/BoardTable";

const HomePage = (props) => {
  const { loadUser, token, isAuthenticated } = props;
  const history = useHistory();
  const [boards, setBoards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
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
      const { data, message } = await boardApi.getAll(config);
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
  }, []);
  const { data } = userBoard;
  return (
    <MainLayout>
      <div className="HomePage">
        <Container maxWidth="lg">
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

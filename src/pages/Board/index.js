import { Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { boardApi } from "../../apis";
import tokenConfig from "../../helpers/tokenConfig";
import { MainLayout } from "../../layouts";
import { authActions } from "../../redux/actions";
import { map } from "lodash";
import Column from "./components";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "1rem",
  },
}));

const _renderColumn = (data = []) => {
  if (data.length) {
    return (
      <React.Fragment>
        {map(data, (item) => (
          <Grid alignContent="center" item xs={12} sm={4}>
            <Column boardName={item.name} actions={item.data} />
          </Grid>
        ))}
      </React.Fragment>
    );
  } else return null;
};

const BoardPage = (props) => {
  const {
    match: { params },
    isAuthenticated,
    loadUser,
    token,
  } = props;
  const [board, setBoard] = React.useState({
    data: null,
    isLoading: false,
    err: null,
  });

  const _fetchBoardById = async () => {
    try {
      setBoard({
        ...board,
        isLoading: true,
      });
      let config = tokenConfig(token);
      const { data, message } = await boardApi.getByID(params.id, config);
      setBoard({
        ...board,
        data,
        isLoading: false,
      });
    } catch (error) {
      setBoard({
        ...board,
        isLoading: false,
        err: error.response.data.message || error,
      });
    }
  };

  React.useEffect(() => {
    loadUser();
    _fetchBoardById();
  }, []);

  const _getCol = () => {
    if (board.data) {
      const {
        data: { wentWell, toImprove, actionsItem },
      } = board;
      return [
        { name: "Went well", data: wentWell },
        { name: "To improve", data: toImprove },
        { name: "Action items", data: actionsItem },
      ];
    }
  };
  const classes = useStyles();
  return (
    <MainLayout>
      {console.log(_getCol())}
      <Grid className={classes.container} container spacing={8}>
        {_renderColumn(_getCol())}
      </Grid>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
});
const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);

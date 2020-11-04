import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { MainLayout } from "../../layouts";
import { authActions, boardActions } from "../../redux/actions";
import { map } from "lodash";
import Column from "./components/Column";
import { useHistory } from "react-router-dom";
import { lightBlue, lightGreen, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "1rem",
    padding: theme.spacing(0, 2),
  },
}));

const _renderColumn = ({ data = [], addAction, boardId, removeAction }) => {
  if (data.length) {
    return (
      <React.Fragment>
        {map(data, (item) => (
          <Grid alignContent="center" item xs={12} sm={4}>
            <Column
              boardId={boardId}
              field={item.field}
              addAction={addAction}
              removeAction={removeAction}
              boardName={item.name}
              actions={item.data}
              color={item.color}
            />
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
    loadBoardByID,
    loadUser,
    addAction,
    board,
    removeAction,
    logoutUser,
    user,
  } = props;
  const history = useHistory();

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
    loadUser();
    loadBoardByID(params.id);
  }, [isAuthenticated, loadUser, history, loadBoardByID, params.id]);

  const _getCol = () => {
    if (board) {
      if (board.data) {
        const {
          data: { wentWell, toImprove, actionsItem },
        } = board;
        return [
          {
            name: "Went well",
            field: "wentWell",
            data: wentWell,
            color: lightGreen[600],
          },
          {
            name: "To improve",
            field: "toImprove",
            data: toImprove,
            color: lightBlue[300],
          },
          {
            name: "Action items",
            field: "actionsItem",
            data: actionsItem,
            color: orange[900],
          },
        ];
      }
    }
  };
  const classes = useStyles();
  return (
    <MainLayout user={user} logoutUser={logoutUser}>
      <Typography align="center" variant="h2">
        {board.data && board.data.name}
      </Typography>
      <Grid className={classes.container} container spacing={8}>
        {_renderColumn({
          data: _getCol(),
          addAction,
          boardId: params.id,
          removeAction,
        })}
      </Grid>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  board: state.board,
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
  loadBoardByID: (id) => dispatch(boardActions.loadBoardByID(id)),
  addAction: (id, action) => dispatch(boardActions.addAction(id, action)),
  removeAction: (id, action) => dispatch(boardActions.removeAction(id, action)),
  logoutUser: () => dispatch(authActions.logoutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);

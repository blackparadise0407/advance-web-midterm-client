import { Box, Grid, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { pullAt, map } from "lodash";
import Column from "./components/Column";
import { useHistory } from "react-router-dom";
import { lightBlue, lightGreen, orange, blue, grey } from "@material-ui/core/colors";
import { DragDropContext } from "react-beautiful-dnd";
import { FacebookShareButton } from "react-share";
import ShareIcon from '@material-ui/icons/Share';
import { authActions, boardActions } from "../../redux/actions";
import { MainLayout } from "../../layouts";
import pusher from "../../helpers/pusher";
import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "1rem",
    padding: theme.spacing(0, 2),
    height: "100% !important",
  },
  box: {
    height: "100% !important",
    padding: theme.spacing(2, 2),
    backgroundColor: grey[100]
  },
  title: {
    // color: 'grey'
    textShadow: `3px 3px 3px ${lightBlue[700]}`,
  },
  iconButton: {
    margin: theme.spacing(0, 2)
  },
  icon: {
    color: '#fff',
  },
  paper: {
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    maxWidth: "40rem",
    margin: "0 auto",
  },
}));

const _renderColumn = ({
  data = [],
  addAction,
  boardId,
  removeAction,
  updateAction,
  boardLoading
}) => {
  if (data.length) {
    return (
      <React.Fragment>
        {map(data, (item, idx) => (
          <Grid key={idx} item xs={12} sm={4}>
            <Column
              isLoading={boardLoading}
              droppableId={item.field}
              boardId={boardId}
              field={item.field}
              addAction={addAction}
              removeAction={removeAction}
              boardName={item.name}
              actions={item.data}
              color={item.color}
              updateAction={updateAction}
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
    updateAction,
    updateBoard,
    realTimeUpdate,
    boardLoading
  } = props;
  const history = useHistory();

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
    loadUser();
    loadBoardByID(params.id);
  }, [isAuthenticated, loadUser, history, loadBoardByID, params.id]);

  React.useEffect(() => {
    const channel = pusher.subscribe(`${params.id}`);
    channel.bind('update', ({ message, data }) => {
      console.log('PUSHER', data);
      realTimeUpdate(data)
    });
  }, [params.id, realTimeUpdate])

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
            color: orange[500],
          },
        ];
      }
    }
  };
  const classes = useStyles();

  const _handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    const { index: dIdx, droppableId: dId } = destination;
    const { index: sIdx, droppableId: sId } = source;
    // console.log(destination);

    if (dIdx === sIdx && dId === sId) {
      return;
    }
    if (board) {
      if (board.data) {
        if (dId === sId) {
          const newBoard = { ...board.data };
          const _tempCol = [...newBoard[dId]];
          pullAt(_tempCol, sIdx);
          _tempCol.splice(dIdx, 0, newBoard[sId][sIdx]);
          newBoard[dId] = _tempCol;
          updateBoard(params.id, newBoard);
          return;
        }
        const newBoard = { ...board.data };
        newBoard[dId].splice(dIdx, 0, newBoard[sId][sIdx]);
        pullAt(newBoard[sId], sIdx);
        updateBoard(params.id, newBoard);
      }
    }
  };

  return (
    <MainLayout user={user} logoutUser={logoutUser}>
      <div className={"BoardPage " + classes.box}>
        <Box component="div">
          <Paper className={classes.paper} elevation={3}>
            <Typography className={'noselect ' + classes.title} align="center" variant="h2">
              {board.data && board.data.name}
              <FacebookShareButton
                children={
                  <IconButton className={classes.iconButton}>
                    <ShareIcon fontSize="large" className={classes.icon} />
                  </IconButton>
                }
                url='http://example.com/board'
                quote="Come and have some fun together"
                hashtag="#retrosprint"
              // url={window.location.href}
              />
            </Typography>
          </Paper>
          <DragDropContext onDragEnd={_handleDragEnd}>
            <Grid className={classes.container} container spacing={8}>
              {_renderColumn({
                data: _getCol(),
                addAction,
                boardId: params.id,
                removeAction,
                updateAction,
                boardLoading
              })}
            </Grid>
          </DragDropContext>
        </Box>
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  board: state.board,
  user: state.auth.user,
  boardLoading: state.board.isLoading
});
const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(authActions.loadUser()),
  loadBoardByID: (id) => dispatch(boardActions.loadBoardByID(id)),
  addAction: (id, action) => dispatch(boardActions.addAction(id, action)),
  removeAction: (id, action) => dispatch(boardActions.removeAction(id, action)),
  logoutUser: () => dispatch(authActions.logoutUser()),
  updateAction: (id, action) => dispatch(boardActions.updateAction(id, action)),
  updateBoard: (id, body) => dispatch(boardActions.updateBoard({ id, body })),
  realTimeUpdate: (body) => dispatch(boardActions.realTimeUpdate(body))
});
export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);

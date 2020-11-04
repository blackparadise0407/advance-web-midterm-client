import React from "react";
import {
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
  InputBase,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddIcon from "@material-ui/icons/Add";
import { map } from "lodash";
import { blue, cyan, grey } from "@material-ui/core/colors";
import SendIcon from "@material-ui/icons/Send";
import BackspaceIcon from "@material-ui/icons/Backspace";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    // maxWidth: "26rem",
    width: "100%",
    padding: "2rem 2rem",
    boxShadow: `5px 10px 20px -5px ${blue[200]}`,
    borderRadius: 10,
    border: ` 1px solid ${theme.palette.action.selected}`,
    "&> * + *": {
      marginTop: "1rem",
    },
  },
  title: {
    color: "#fff",
  },
  action: {
    padding: ".7rem 2rem",
    display: "flex",
    alignItems: "center",
    // backgroundColor: cyan[700],
  },
  flex: {
    flexGrow: 1,
  },
  button: {
    marginTop: "1rem",
    width: "100%",
    backgroundColor: grey[200],
    "&:hover": {
      backgroundColor: grey[300],
    },
  },
  icon: {
    transition: "opacity 0.2s ease",
    "&:hover": {
      cursor: "pointer",
      opacity: "0.8",
    },
  },
  input: {
    width: "100%",
    borderRadius: 6,
    padding: ".5rem 2rem",
    boxShadow: theme.shadows[1],
    backgroundColor: cyan[100],
  },
  bottomActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Column = ({
  removeAction,
  addAction,
  boardName,
  actions = [],
  field,
  boardId,
  color,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState("");
  const classes = useStyles();
  const _handleClick = () => {
    setIsEdit(!isEdit);
  };
  const _handleChange = (e) => setValue(e.target.value);
  const _submit = (e) => {
    e.preventDefault();
    const data = { field, name: value };
    addAction({ id: boardId, action: data });
    setValue("");
    setIsEdit(false);
  };
  const _removeAction = (id) => {
    removeAction({ id: boardId, action: { field, actionId: id } });
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      _submit(e);
    }
  };
  return (
    <Paper
      component="div"
      variant="elevation"
      elevation={5}
      className={classes.root}
      m={1}
      style={{
        backgroundColor: color,
        boxShadow: `2px 5px 25px -5px ${color}`,
      }}
    >
      <Typography className={classes.title} align="center" variant="h4">
        {boardName}
      </Typography>
      {actions.length
        ? map(actions, (item) => (
            <Paper
              className={classes.action}
              component="div"
              variant="elevation"
              elevation={2}
            >
              <Typography variant="body2">{item.name}</Typography>
              <div className={classes.flex} />
              <HighlightOffIcon
                color="error"
                className={classes.icon}
                fontSize="large"
                onClick={() => _removeAction(item._id)}
              />
            </Paper>
          ))
        : null}
      {isEdit ? (
        <InputBase
          className={classes.input}
          onChange={_handleChange}
          value={value}
          placeholder="Action name ..."
          onKeyDown={_handleKeyDown}
        />
      ) : null}
      {isEdit ? (
        <Box
          className={classes.bottomActions + " spacing-horizontal-l"}
          component="div"
          m={1}
        >
          <SendIcon
            className={classes.icon}
            color="action"
            fontSize="large"
            onClick={_submit}
          />
          <BackspaceIcon
            className={classes.icon}
            onClick={() => setIsEdit(false)}
            color="error"
            fontSize="large"
          />
        </Box>
      ) : (
        <Button
          onClick={_handleClick}
          variant="contained"
          className={classes.button}
        >
          <AddIcon fontSize="large" />
        </Button>
      )}
    </Paper>
  );
};

export default Column;

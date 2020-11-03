import React from "react";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
  InputBase,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { map } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    // maxWidth: "26rem",
    width: "100%",
    padding: "2rem 2rem",
    borderRadius: 6,
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
  },
  button: {
    marginTop: "1rem",
    width: "100%",
  },
  input: {
    width: "100%",
    borderRadius: 6,
    padding: ".7rem 2rem",
    boxShadow: theme.shadows[1],
    backgroundColor: "#eaeaea",
  },
}));

const Column = ({ boardName, actions = [] }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const classes = useStyles();
  const handleClick = () => setIsEdit(!isEdit);
  return (
    <Paper
      component="div"
      variant="elevation"
      elevation={5}
      className={classes.root}
      m={1}
    >
      <Typography className={classes.title} align="center" variant="h4">
        {boardName}
      </Typography>
      {actions.length &&
        map(actions, (item) => (
          <Paper
            className={classes.action}
            component="div"
            variant="elevation"
            elevation={2}
          >
            <Typography variant="body2">{item.name}</Typography>
          </Paper>
        ))}
      <InputBase className={classes.input} />
      <Button
        onClick={handleClick}
        variant="outlined"
        className={classes.button}
      >
        <AddIcon fontSize="large" />
      </Button>
    </Paper>
  );
};

export default Column;

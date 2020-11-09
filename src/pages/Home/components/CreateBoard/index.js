import React from "react";
import { InputBase, Paper, makeStyles, CircularProgress } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { boardApi } from "../../../../apis";
import tokenConfig from "../../../../helpers/tokenConfig";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1, 2),
    width: "40rem",
    margin: "1rem auto",
    display: "flex",
    alignItems: "center",
  },
  input: {},
  flexGrow: {
    flexGrow: 1,
  },
  icon: {
    transition: "opacity 0.2s ease",
    "&:hover": {
      opacity: "0.8",
      cursor: "pointer",
    },
  },
}));

const CreateBoard = ({ token, handleAddRow }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [_loading, setLoading] = React.useState(false)
  const _handleChange = (e) => {
    setValue(e.target.value);
  };

  const _handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      _handleSubmit(e);
    }
  };

  const _handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (!value) {
      toast.warn("Board name is empty!");
      return;
    }
    const body = JSON.stringify({ name: value });
    const config = tokenConfig(token);
    try {
      const { message, data } = await boardApi.addBoard(body, config);
      handleAddRow(data);
      setValue("");
      toast.success(message);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <Paper className={classes.paper} elevation={4} variant="elevation">
      <InputBase
        fullWidth
        placeholder="Board name"
        value={value}
        onChange={_handleChange}
        className={classes.input}
        onKeyDown={_handleKeyDown}
      />
      <div className={classes.flexGrow} />
      {_loading ? <CircularProgress size={16} color="primary" /> :
        <AddCircleIcon
          className={classes.icon}
          onClick={_handleSubmit}
          color="primary"
          fontSize="large"
        />}

    </Paper>
  );
};

export default CreateBoard;

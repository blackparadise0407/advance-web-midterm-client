import React from "react";

import ClearIcon from "@material-ui/icons/Clear";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import {
  withStyles,
  makeStyles,
  TableRow,
  TableCell,
  InputBase,
  Box,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";
import { boardApi } from "../../../../apis";
import tokenConfig from "../../../../helpers/tokenConfig";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  footer: {
    flex: 1,
  },
  actions: {
    flex: 1,
    // display: "flex",
    // justifyContent: "space-evenly",
  },
  icons: {
    fontSize: 22,
    margin: "0 1rem",
    [theme.breakpoints.down("md")]: {
      margin: "0 .5rem",
    },
    "&:hover": {
      opacity: "0.6",
      cursor: "pointer",
    },
  },
  input: {
    border: `1px solid ${theme.palette.action.hover}`,
    padding: theme.spacing(0.1, 2),
    fontSize: 14,
    width: "18rem",
    margin: "0 0",
  },
  cell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: "#eee",
      cursor: "pointer",
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const MyTableRow = ({
  idx,
  _id,
  name,
  email,
  createdAt,
  _handleDelete,
  token,
  handleUpdateRow,
}) => {
  const classes = useStyles();

  const [isEdit, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState("");
  const _handleChange = (e) => {
    setValue(e.target.value);
  };
  const _handleEdit = () => {
    setIsEdit(true);
  };
  const _handleCancel = () => {
    setIsEdit(false);
  };

  const _handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      _handleSubmit(e, id);
    }
  };
  const _handleSubmit = async (e, id) => {
    e.preventDefault();
    if (!value) {
      toast.warn("Name cannot be empty")
      return
    }
    const config = tokenConfig(token);
    const body = JSON.stringify({ name: value });
    try {
      const { data, message } = await boardApi.update(id, body, config);
      handleUpdateRow(data);
      setValue("");
      setIsEdit(false);
      toast.success(message);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="center" component="th" scope="row">
        {idx + 1}
      </StyledTableCell>
      <StyledTableCell align="center">
        {isEdit ? (
          <Box className={classes.cell} component="div">
            <InputBase
              className={classes.input}
              placeholder="Board name..."
              onChange={_handleChange}
              value={value}
              onKeyDown={(e) => _handleKeyDown(e, _id)}
            />
            <CheckCircleIcon
              className={classes.icons}
              fontSize="large"
              color="primary"
              onClick={(e) => _handleSubmit(e, _id)}
            />
          </Box>
        ) : (
            <Link
              style={{ width: "100%", height: "100%" }}
              to={{ pathname: `/board/${_id}` }}
            >
              {name}
            </Link>
          )}
      </StyledTableCell>
      <StyledTableCell align="center">{email}</StyledTableCell>
      <StyledTableCell align="center">
        {new Date(createdAt).toDateString()}
      </StyledTableCell>
      <StyledTableCell align="center" className={classes.actions}>
        {isEdit ? (
          <ClearIcon
            onClick={_handleCancel}
            color="primary"
            className={classes.icons}
          />
        ) : (
            <CreateIcon
              onClick={_handleEdit}
              color="primary"
              className={classes.icons}
            />
          )}
        <DeleteForeverIcon
          color="error"
          className={classes.icons}
          onClick={() => _handleDelete(_id)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default MyTableRow;

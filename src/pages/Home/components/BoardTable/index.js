import React from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  TableCell,
  Box,
} from "@material-ui/core";
import { map, times } from "lodash";
import { boardApi } from "../../../../apis";
import tokenConfig from "../../../../helpers/tokenConfig";
import MyTableRow from "../MyTableRow";
import { EmptyImage } from "../../../../constants";
import { toast } from "react-toastify";
import { Skeleton } from "@material-ui/lab";

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
  imgWrapper: {
    display: "grid",
    placeItems: "center",
  },
  img: {
    maxWidth: "22rem",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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

const BoardTable = ({ isLoading, rows = [], token, handleDeleteRow, handleUpdateRow }) => {
  const classes = useStyles();

  const _handleDelete = async (id) => {
    const config = tokenConfig(token);
    handleDeleteRow(id);
    try {
      const { message } = await boardApi.removeBoard(id, config);
      toast.success(message);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (rows) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Board name</StyledTableCell>
              <StyledTableCell align="center">Original owner</StyledTableCell>
              <StyledTableCell align="center">Created at</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              <>
                {map(
                  rows,
                  ({ _id, name, createdBy: { email }, createdAt }, idx) => (
                    <MyTableRow
                      idx={idx}
                      key={idx}
                      _id={_id}
                      name={name}
                      email={email}
                      createdAt={createdAt}
                      _handleDelete={_handleDelete}
                      token={token}
                      handleUpdateRow={handleUpdateRow}
                    />
                  )
                )}
              </>
            ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box className={classes.imgWrapper} component="div">
                      <img className={classes.img} src={EmptyImage} alt="" />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else return null;
};

export default BoardTable;

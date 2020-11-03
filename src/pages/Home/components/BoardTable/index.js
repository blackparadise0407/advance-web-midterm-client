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
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { map } from "lodash";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";
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

const BoardTable = ({ rows = [] }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                    <StyledTableRow key={idx}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {idx}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link
                          style={{ width: "100%", height: "100%" }}
                          to={{ pathname: `/board/${_id}` }}
                        >
                          {name}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">{email}</StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(createdAt).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={classes.actions}
                      >
                        <CreateIcon color="primary" className={classes.icons} />
                        <DeleteForeverIcon
                          color="error"
                          className={classes.icons}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </>
            ) : null}
          </TableBody>
          <TableFooter className={classes.footer}>
            {/* <StyledTableRow>
              <div className={classes.flex} />
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </StyledTableRow> */}
          </TableFooter>
        </Table>
      </TableContainer>
    );
  } else return null;
};

export default BoardTable;

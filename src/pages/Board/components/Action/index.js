import React from "react";
import { InputBase, makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from 'clsx'
import EditIcon from "@material-ui/icons/Edit";
import BlockRoundedIcon from "@material-ui/icons/BlockRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Draggable } from "react-beautiful-dnd";
// import { clearMessage } from "../../../../redux/actions/authActions";
import { lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  action: {
    padding: ".8rem 2rem",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  isDragging: {
    boxShadow: theme.shadows[20],
    background: lightGreen[400]
  },
  textDragging: {
    color: '#fff',
  },
  flex: {
    flexGrow: 1,
  },
  icon: {
    transition: "opacity 0.2s ease",
    "&:hover": {
      cursor: "pointer",
      opacity: "0.8",
    },
  },
  text: {
    fontWeight: 600,
    transition: 'color ease 0.2s'
  },
}));

const Action = ({
  field,
  boardId,
  updateAction,
  _removeAction,
  _id,
  name,
  idx,
  // provided,
}) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState("");

  const _handleChange = (e) => setValue(e.target.value);

  const _handleUpdate = (e) => {
    e.preventDefault();
    if (!value) return;
    updateAction({ id: boardId, action: { field, name: value, _id } });
    setIsEdit(false);
  };
  return (
    <Draggable key={_id} index={idx} draggableId={_id}>
      {(provided, snapshot) => {
        return (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={clsx({
              [classes.action]: true,
              [classes.isDragging]: snapshot.isDragging
            })
            }
            component="div"
            variant="elevation"
            elevation={2}
          >
            {isEdit ? (
              <InputBase
                placeholder="Name..."
                value={value}
                onChange={_handleChange}
              />
            ) : (
                <Typography
                  className={clsx({
                    [classes.text]: true,
                    [classes.textDragging]: snapshot.isDragging
                  })
                  }
                  variant="body1">
                  {name}
                </Typography>
              )}
            <div className={classes.flex} />
            {isEdit ? (
              <React.Fragment>
                <BlockRoundedIcon
                  color="error"
                  className={classes.icon}
                  fontSize="large"
                  onClick={() => setIsEdit(false)}
                />
                <CheckCircleRoundedIcon
                  color="secondary"
                  className={classes.icon}
                  fontSize="large"
                  onClick={_handleUpdate}
                />
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <EditIcon
                    color="primary"
                    className={classes.icon}
                    fontSize="large"
                    onClick={() => setIsEdit(true)}
                  />
                  <DeleteForeverIcon
                    color="error"
                    className={classes.icon}
                    fontSize="large"
                    onClick={() => _removeAction(_id)}
                  />
                </React.Fragment>
              )}
          </Paper>
        );
      }}
    </Draggable >
  );
};

export default Action;

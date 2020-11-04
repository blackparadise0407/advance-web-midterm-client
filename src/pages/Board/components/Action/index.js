import React from 'react'
import { InputBase, makeStyles, Paper, Typography } from '@material-ui/core'
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from '@material-ui/icons/Edit';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles(theme => ({
  action: {
    padding: ".7rem 2rem",
    display: "flex",
    alignItems: "center",
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
    fontWeight: 600
  }
}))

const Action = ({ field, boardId, updateAction, _removeAction, _id, name }) => {
  const classes = useStyles()
  const [isEdit, setIsEdit] = React.useState(false)
  const [value, setValue] = React.useState('')

  const _handleChange = (e) => setValue(e.target.value)

  const _handleUpdate = (e) => {
    e.preventDefault()
    console.log(field);
    if (!value) return
    console.log({ boardId });
    updateAction({ id: boardId, action: { field, name: value, _id } })
    setIsEdit(false)
  }
  return (
    <Paper
      className={classes.action}
      component="div"
      variant="elevation"
      elevation={2}
    >
      {isEdit ?
        <InputBase
          placeholder='Name...'
          value={value}
          onChange={_handleChange}

        />
        :
        <Typography className={classes.text} variant="body1">{name}</Typography>
      }
      <div className={classes.flex} />
      {
        isEdit ?
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
          :
          <React.Fragment>
            <EditIcon
              color="primary"
              className={classes.icon}
              fontSize="large"
              onClick={() => setIsEdit(true)}
            />
            <HighlightOffIcon
              color="error"
              className={classes.icon}
              fontSize="large"
              onClick={() => _removeAction(_id)}
            />
          </React.Fragment>
      }


    </Paper>
  )
}

export default Action

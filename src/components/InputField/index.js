import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles, InputAdornment } from '@material-ui/core';

import './styles.scss'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: 20,
    '& .MuiOutlinedInput-root': {
      fontWeight: 600,
      fontSize: 16,
      '& fieldset': {
        borderRadius: '20px',
      },
    },

  },
  icon: {
    fontSize: 25,
  }
}))

const InputField = ({ Icon, ...rest }) => {
  const classes = useStyles();
  return (
    <TextField className={classes.root} size='small' variant='outlined' {...rest}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon color='secondary' className={classes.icon} />
          </InputAdornment>
        ),
      }}
    />
  )
}

InputField.propTypes = {

}

export default InputField

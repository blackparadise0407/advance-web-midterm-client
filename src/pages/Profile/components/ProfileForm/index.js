import React from 'react'
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { InputField } from "../../../../components";
import { Box, Button, makeStyles, Tooltip } from "@material-ui/core";
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "column",
    padding: theme.spacing(1, 2),
    "&>*+*": {
      marginTop: "1rem"
    }
    // alignItems: 'center'
  }
}))


const ProfileForm = ({ changeProfile, user: { username, email } }) => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    IUsername: username,
    IPassword: ""
  })
  const _handleChange = (e) => setState({
    ...state,
    [e.target.name]: e.target.value
  })
  const _handelSubmit = e => {
    e.preventDefault()
    const { IUsername, IPassword } = state
    if (!IUsername) {
      toast.warning('User cannot be empty')
      return
    }
    changeProfile({ username: IUsername, password: IPassword })
  }
  const { IPassword, IUsername } = state
  return (
    <form className={classes.form} onSubmit={_handelSubmit}>
      <InputField
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        disabled
        defaultValue={email}
        Icon={EmailIcon}
        label="Email"
      />
      <InputField
        type="username"
        id="username"
        name="IUsername"
        placeholder="Username"
        value={IUsername}
        onChange={e => _handleChange(e)}
        Icon={AccountCircleIcon}
        label="Username"
      />
      <InputField
        type="password"
        id="password"
        name="IPassword"
        placeholder="Confirm password"
        value={IPassword}
        onChange={e => _handleChange(e)}
        Icon={LockIcon}
        label="Confirm password"
      />
      <Tooltip arrow title="If you login with social account, just type in your email again to confirm">
        <Button size="large" color="primary" variant='outlined' type="submit">
          <Box fontWeight={700} fontSize={16}>
            Submit
        </Box>
        </Button>
      </Tooltip>


    </form>
  )
}

export default ProfileForm

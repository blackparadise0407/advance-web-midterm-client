import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AuthLayout } from '../../layouts'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'

import LoginForm from './components/LoginForm'
import { LoginImage } from '../../constants'
import './styles.scss'
import { authActions } from '../../redux/actions'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {

  },
  form: {
    borderRadius: 20,
    boxShadow: theme.shadows[20],
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      padding: '4rem 0'
    },
  },
  loginContainer: {
    display: 'grid',
    placeItems: 'center'
  },
  image: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  title: {
    fontWeight: 900,
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
      fontSize: 28
    },
  }
}))

const LoginPage = (props) => {
  const {
    isAuthenticated,
    loadUser,
    loginUser
  } = props
  const classes = useStyles()
  const history = useHistory()
  React.useEffect(() => {
    loadUser()
  }, [loadUser])

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [history, isAuthenticated])

  return (
    <AuthLayout>
      <Container className={'LoginPage ' + classes.root}>
        <Grid className={classes.form} container >
          <Grid className={classes.image} item xs={12} lg={6} spacing={2}>
            <div className="image-wrapper">
              <img src={LoginImage} alt="" />
            </div>
          </Grid>
          <Grid className={classes.loginContainer} xs={12} lg={6} spacing={2} item>
            <Typography className={classes.title} align="center" color='primary' variant='h2'>WELCOME BACK</Typography>
            <LoginForm loginUser={loginUser} />
          </Grid>
        </Grid>
      </Container>
    </AuthLayout>
  )
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(authActions.loadUser()),
  loginUser: ({ email, password }) => dispatch(authActions.login({ email, password }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AuthLayout } from '../../layouts'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'

import RegisterForm from './components/RegisterForm'
import { RegisterImage } from '../../constants'
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
  registerContainer: {
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
    [theme.breakpoints.down('md')]: {
      fontSize: 28
    },
  }
}))

const RegisterPage = (props) => {
  const {
    loadUser,
    registerUser,
    isAuthenticated
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
      <Container className={'RegisterPage ' + classes.root}>
        <Grid className={classes.form} container >
          <Grid className={classes.image} item xs={12} lg={6} spacing={2}>
            <div className="image-wrapper">
              <img src={RegisterImage} alt="" />
            </div>
          </Grid>
          <Grid className={classes.registerContainer} xs={12} lg={6} spacing={2} item>
            <Typography className={classes.title} align="center" color='primary' variant='h2'>REGISTER</Typography>
            <RegisterForm registerUser={registerUser} />
          </Grid>
        </Grid>
      </Container>
    </AuthLayout>
  )
}

RegisterPage.propTypes = {

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(authActions.loadUser()),
  registerUser: ({ username, email, password }) => dispatch(authActions.register({ username, email, password }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)

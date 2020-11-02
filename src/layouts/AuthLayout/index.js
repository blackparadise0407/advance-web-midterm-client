import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const AuthLayout = ({ isAuthen, children }) => {
  return (
    <section className='AuthLayout'>
      {children}
    </section>
  )
}

AuthLayout.propTypes = {
  isAuthen: PropTypes.bool.isRequired,
}

export default AuthLayout

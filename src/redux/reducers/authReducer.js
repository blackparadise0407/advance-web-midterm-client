import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  CLEAR_AUTH_MESSAGE
} from '../actions/types';

const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem('token') !== null || false,
  token: localStorage.getItem('token'),
  user: null,
  msg: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        msg: ''
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        msg: action.payload.msg,
        isLoading: false,
        isAuthenticated: false,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        msg: action.payload.msg
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        msg: action.payload.msg,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      }
    case CLEAR_AUTH_MESSAGE:
      return {
        ...state,
        msg: ''
      }
    default: return { ...state }
  }
}
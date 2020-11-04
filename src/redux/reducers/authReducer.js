import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  CLEAR_AUTH_MESSAGE,
  UPDATE_SUCCESS,
  UPDATE_FAIL
} from "../actions/types";

const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem("token") !== null || false,
  token: localStorage.getItem("token"),
  user: null,
  msg: "",
  err: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        msg: "",
        err: "",
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        err: "",
        msg: action.payload.msg,
        isLoading: false,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        err: "",
        isAuthenticated: true,
        isLoading: false,
        msg: action.payload.msg,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        msg: "",
        err: action.payload.err,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        msg: action.payload.msg
      }
    case UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      }
    case CLEAR_AUTH_MESSAGE:
      return {
        ...state,
        msg: "",
        err: "",
      };
    default:
      return { ...state };
  }
};

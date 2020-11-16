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
  UPDATE_FAIL,
} from "./types";
import { authApi } from "../../apis";
import history from "../../helpers/history";

export const tokenConfig = (getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
};

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const config = tokenConfig(getState);
  try {
    const { data } = await authApi.auth(config);
    dispatch({ type: USER_LOADED, payload: data });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: {
        err: error.response.data.message || error,
      },
    });
  }
};

export const register = ({ username, email, password }) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const body = JSON.stringify({ username, email, password });
    const { message } = await authApi.register(body);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        msg: message,
      },
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: {
        err: error.response.data.message || error,
      },
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const body = JSON.stringify({ email, password });
    const {
      message,
      data: { token },
    } = await authApi.login(body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        msg: message,
        token,
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        err: error.response.data.message || error,
      },
    });
  }
};

export const updateProfile = ({ username, password }) => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  try {
    const config = tokenConfig(getState)
    const body = JSON.stringify({ username, password });
    const { data, message } = await authApi.updateProfile(body, config)
    dispatch({
      type: UPDATE_SUCCESS,
      payload: {
        user: data,
        msg: message
      }
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL,
      payload: error.response.data.message || error
    });
  }

}

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: {
      err: "",
    },
  });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_AUTH_MESSAGE });
};


export const googleSignIn = ({ googleId, email, name }) => async dispatch => {
  dispatch({ type: USER_LOADING });
  try {
    const body = JSON.stringify({ googleId, email, name })
    const { message, data: { token } } = await authApi.googleSignIn(body)
    dispatch({
      type: LOGIN_SUCCESS, payload: {
        msg: message,
        token
      }
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        err: error.response.data.message || error,
      },
    });
  }
}

export const facebookSignIn = ({ id, name }) => async dispatch => {
  dispatch({ type: USER_LOADING });
  try {
    const body = JSON.stringify({ id, name })
    const { message, data: { token } } = await authApi.facebookSignIn(body)
    dispatch({
      type: LOGIN_SUCCESS, payload: {
        msg: message,
        token
      }
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        err: error.response.data.message || error,
      },
    });
  }
}
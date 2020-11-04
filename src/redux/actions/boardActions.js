import { boardApi } from "../../apis";
import { tokenConfig } from "./authActions";
import {
  BOARD_ERROR,
  BOARD_LOADED,
  BOARD_LOADING,
  ADD_ACTION,
  DELETE_ACTION,
} from "./types";

export const loadBoardByID = (id) => async (dispatch, getState) => {
  dispatch({ type: BOARD_LOADING });
  try {
    const config = tokenConfig(getState);
    const { data, message } = await boardApi.getByID(id, config);
    dispatch({
      type: BOARD_LOADED,
      payload: {
        message,
        data,
      },
    });
  } catch (error) {
    dispatch({ type: BOARD_ERROR, err: error.response.data.message || error });
  }
};

export const addAction = ({ id, action: { field, name } }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: BOARD_LOADING });
  const config = tokenConfig(getState);
  const body = JSON.stringify({ field, name });
  try {
    const { data, message } = await boardApi.addAction(id, body, config);
    dispatch({
      type: ADD_ACTION,
      payload: {
        message,
        data,
      },
    });
  } catch (error) {
    dispatch({ type: BOARD_ERROR, err: error.response.data.message || error });
  }
};

export const removeAction = ({ id, action: { field, actionId } }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: BOARD_LOADING });
  const config = tokenConfig(getState);
  const body = JSON.stringify({ field, actionId });
  try {
    const { data, message } = await boardApi.removeAction(id, body, config);
    dispatch({
      type: DELETE_ACTION,
      payload: {
        message,
        data,
      },
    });
  } catch (error) {
    dispatch({ type: BOARD_ERROR, err: error.response.data.message || error });
  }
};

export const updateAction = ({ id, action: { field, _id, name } }) => async (dispatch,
  getState) => {
  dispatch({ type: BOARD_LOADING });
  const config = tokenConfig(getState);
  const body = JSON.stringify({ field, _id, name });
  try {
    const { data, message } = await boardApi.updateAction(id, body, config);
    dispatch({
      type: ADD_ACTION,
      payload: {
        message,
        data,
      },
    });
  } catch (error) {
    dispatch({ type: BOARD_ERROR, err: error.response.data.message || error });
  }
}

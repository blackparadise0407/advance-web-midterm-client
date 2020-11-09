import {
  BOARD_ERROR,
  BOARD_LOADED,
  BOARD_LOADING,
  ADD_ACTION,
  DELETE_ACTION,
  UPDATE_ACTION,
  UPDATE_BOARD,
} from "../actions/types";

const initialState = {
  isLoading: false,
  data: null,
  msg: "",
  err: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOARD_LOADING:
      return {
        ...state,
        msg: "",
        err: "",
        isLoading: true,
      };
    case UPDATE_BOARD:
    case BOARD_LOADED:
    case ADD_ACTION:
    case UPDATE_ACTION:
    case DELETE_ACTION: {
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        msg: action.payload.message,
      };
    }
    case BOARD_ERROR: {
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

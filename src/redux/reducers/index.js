import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardReducer from './boardReducer';

export default combineReducers({
  auth: authReducer,
  board: boardReducer,
});
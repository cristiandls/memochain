import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import { web3Reducer } from './web3Reducer';

export default combineReducers({
  gameReducer: gameReducer,
  web3Reducer: web3Reducer,
});
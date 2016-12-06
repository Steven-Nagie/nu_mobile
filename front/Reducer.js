import {combineReducers} from 'redux';
import user from "./ducks/userDuck.js";
import calcComponent from './ducks/calcDuck.js';

export default combineReducers({
  user,
  calcComponent
});

import {combineReducers} from 'redux';
import user from "./ducks/userDuck.js";
import calcComponent from './ducks/calcDuck.js';
import challenge from './ducks/challengeDuck.js';

export default combineReducers({
  user,
  calcComponent,
  challenge
});

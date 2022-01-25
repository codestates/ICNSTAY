import { combineReducers } from 'redux';
import accommodationReducer from './accommodationReducer';
import signinReducer from './singinReducer';
import preloadReducer from './preloadReducer';
import visitedPageReducer from './visitedPageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  accommodationReducer, 
  signinReducer,
  preloadReducer,
  visitedPageReducer,
  userReducer
});

export default rootReducer;
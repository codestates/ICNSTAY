import { combineReducers } from 'redux';
import accommodationReducer from './accommodationReducer';
import visitedPageReducer from './visitedPageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  accommodationReducer, 
  visitedPageReducer,
  userReducer
});

export default rootReducer;
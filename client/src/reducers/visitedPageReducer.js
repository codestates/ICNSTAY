import { initialState } from './initialState';
import { SET_VISITED_PAGE } from '../actions/index';

const visitedPageReducer = ( state = initialState, action ) => {

  switch (action.type) {

    case SET_VISITED_PAGE:
      return Object.assign({}, state, {
        visitedPage: action.payload
      });
      break;
    
    default:
      return state;
  };
};

export default visitedPageReducer;
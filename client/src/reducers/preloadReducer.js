import { initialState } from './initialState';
import { SET_PRELOAD_REDUCER } from '../actions/index';

const preloadReducer = ( state = initialState, action ) => {

  switch (action.type) {

    case SET_PRELOAD_REDUCER:
      return Object.assign({}, state, {
        isLoading: action.payload
      });
      break;

    default:
      return state;
  }
  
}

export default preloadReducer;
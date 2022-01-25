import { initialState } from './initialState';
import { SET_USER } from '../actions/index';

const userReducer = ( state = initialState, action ) => {

  switch (action.type) {

    case SET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
      break;

    default:
      return state;
  }
  
}

export default userReducer;
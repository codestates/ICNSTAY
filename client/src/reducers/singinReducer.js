import { initialState } from './initialState';
import { SET_SIGNIN_STATUS } from '../actions/index';

const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNIN_STATUS:
      return Object.assign({}, state, {
        isSignIn: action.payload,
      });
      break;

    default:
      return state;
  }
};

export default signinReducer;

import { initialState } from './initialState';
import { SET_ACCOMMODATION_DETAIL } from '../actions/index';

const accommodationReducer = ( state = initialState, action ) => {

  switch (action.type) {

    case SET_ACCOMMODATION_DETAIL:
      return Object.assign({}, state, {
        accommodationDetail: action.payload
      });
      break;
    
    default:
      return state;
  };
};

export default accommodationReducer;
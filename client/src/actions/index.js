export const SET_ACCOMMODATION_DETAIL = 'SET_ACCOMMODATION_DETAIL';
export const SET_CURRENT_IMAGE = 'SET_CURRENT_IMAGE';
export const SET_SIGNIN_STATUS = 'SET_SIGNIN_STATUS';
export const SET_PRELOAD_REDUCER = 'SET_PRELOAD_REDUCER';
export const SET_VISITED_PAGE = 'SET_VISITED_PAGE';
export const SET_USER = 'SET_USER';

export const setAccommodationDetail = (information) => {
  return {
    type: SET_ACCOMMODATION_DETAIL,
    payload: {
      information
    }
  }
}

export const setIsSignIn = (boolean) => {
  return {
    type: SET_SIGNIN_STATUS,
    payload: boolean
  }
}

export const setIsLoading = (boolean) => {
  return {
    type: SET_PRELOAD_REDUCER,
    payload: boolean
  }
}

export const setVisitedPage = (string) => {
  return {
    type: SET_VISITED_PAGE,
    payload: string
  }
}

export const setUser = (obj) => {
  return {
    type: SET_USER,
    payload: obj
  }
}
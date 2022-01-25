export const SET_ACCOMMODATION_DETAIL = 'SET_ACCOMMODATION_DETAIL';
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
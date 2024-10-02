export const FETCH_CAFES = 'FETCH_CAFES';
export const SET_CAFES = 'SET_CAFES';
export const ADD_CAFE = 'ADD_CAFE';
export const UPDATE_CAFE = 'UPDATE_CAFE';
export const DELETE_CAFE = 'DELETE_CAFE';

export const fetchCafes = (location) => ({
  type: FETCH_CAFES,
  payload: location,
});

export const setCafes = (cafes) => ({
  type: SET_CAFES,
  payload: cafes,
});

export const addCafe = (cafe) => ({
  type: ADD_CAFE,
  payload: cafe,
});

export const updateCafe = (cafe) => ({
  type: UPDATE_CAFE,
  payload: cafe,
});

export const deleteCafe = (id) => ({
  type: DELETE_CAFE,
  payload: id,
});

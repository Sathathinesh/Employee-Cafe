import { SET_CAFES, ADD_CAFE, UPDATE_CAFE, DELETE_CAFE } from '../actions/cafeActions';

const initialState = {
  cafes: [],
};

const cafeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAFES:
      return {
        ...state,
        cafes: action.payload,
      };
    case ADD_CAFE:
      return {
        ...state,
        cafes: [...state.cafes, action.payload],
      };
    case UPDATE_CAFE:
      return {
        ...state,
        cafes: state.cafes.map(cafe => cafe.id === action.payload.id ? action.payload : cafe),
      };
    case DELETE_CAFE:
      return {
        ...state,
        cafes: state.cafes.filter(cafe => cafe.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cafeReducer;

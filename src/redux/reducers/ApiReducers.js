import { FETCH_API_DATA, SET_LOADING, SET_ERROR } from '../types/ApiTypes';

const initialState = {
  apiData: null,
  currentStatus: {},
  loading: false,
  error: null,
};

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_API_DATA:
      return {
        ...state,
        apiData: action.payload.apiData,
        currentStatus: action.payload.currentStatus, // Set currentStatus here
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

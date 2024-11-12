import {
    FETCH_SITES_REQUEST,
    FETCH_SITES_SUCCESS,
    FETCH_SITES_FAILURE,
  } from '../types/SiteTypes';
  
  const initialState = {
    loading: false,
    sites: [],
    error: null,
  };
  
  const siteReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SITES_REQUEST:
        return { ...state, loading: true };
      case FETCH_SITES_SUCCESS:
        return { ...state, loading: false, sites: action.payload };
      case FETCH_SITES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default siteReducer;
  
import {
    FETCH_SITES_REQUEST,
    FETCH_SITES_SUCCESS,
    FETCH_SITES_FAILURE,
  } from '../types/SiteTypes';
  import { fetchSitesFromAPI } from '../services/SiteService';
  
  export const fetchSitesRequest = () => ({
    type: FETCH_SITES_REQUEST,
  });
  
  export const fetchSitesSuccess = (sites) => ({
    type: FETCH_SITES_SUCCESS,
    payload: sites,
  });
  
  export const fetchSitesFailure = (error) => ({
    type: FETCH_SITES_FAILURE,
    payload: error,
  });
  
  export const fetchSitesList = () => async (dispatch) => {
    dispatch(fetchSitesRequest());
    try {
      const data = await fetchSitesFromAPI();
      if (!data.errors) {
        dispatch(fetchSitesSuccess(data));
      } else {
        dispatch(fetchSitesFailure(data.error));
      }
    } catch (error) {
      dispatch(fetchSitesFailure(error.message));
    }
  };
  
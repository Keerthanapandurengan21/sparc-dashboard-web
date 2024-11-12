import { FETCH_API_DATA, SET_LOADING, SET_ERROR } from '../types/ApiTypes';
import { getApiHealthCheckData } from '../services/ApiService';

export const fetchApiData = (site, appSource) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await getApiHealthCheckData(site, appSource);
    
    dispatch({ 
      type: FETCH_API_DATA, 
      payload: {
        apiData: data?.data,
        currentStatus: data?.currentStatus || {}
      }
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

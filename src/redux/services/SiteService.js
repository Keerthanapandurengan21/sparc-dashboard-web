import axios from 'axios';

export const fetchSitesFromAPI = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/dashboard/get-sites`);
  return response.data.data;
};

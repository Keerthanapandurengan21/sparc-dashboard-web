import { REST_END_POINTS } from "../../RestEndPoints";

export const getApiHealthCheckData = async (site, appSource) => {
  try {
    const response = await fetch(
      `${REST_END_POINTS.API_HEALTH_CHECK}?site=${site}&appSource=${appSource}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch API health check data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong while fetching API data');
  }
};
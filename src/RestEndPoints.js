
export const API_BASE_URL = 'http://localhost:8080/api/v1/dashboard';

export const REST_END_POINTS = {
  GET_SITES: `${API_BASE_URL}/get-sites`,
  GET_ORDERS:`${API_BASE_URL}/getOrders`,
  GET_CLOUDFARE_DATA:`${API_BASE_URL}/getCloudflareMetrics`,
  GET_SERVICE_STS:`${API_BASE_URL}/service-status`,
  GET_JOB_STATUS:`${API_BASE_URL}/jobs-status`,
  API_HEALTH_CHECK:`${API_BASE_URL}/health-check`,
  UPLOAD_JOB : `${API_BASE_URL}/upload-job`,
  UPLOAD_SITE_DATA :  `${API_BASE_URL}/upload-sitedata`
};

import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_TRAFFIC_REQUEST,
  FETCH_TRAFFIC_SUCCESS,
  FETCH_TRAFFIC_FAILURE,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
} from '../types/DashboardTypes';
import {
  fetchOrdersData as fetchOrdersDataService,
  fetchTrafficData as fetchTrafficDataService,
  fetchServicesData as fetchServicesDataService,
  fetchJobsData as fetchJobsDataService,
} from '../services/DashboardService';

const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });
const fetchOrdersSuccess = (data) => ({ type: FETCH_ORDERS_SUCCESS, payload: data });
const fetchOrdersFailure = (error) => ({ type: FETCH_ORDERS_FAILURE, payload: error });
const fetchTrafficRequest = () => ({ type: FETCH_TRAFFIC_REQUEST });
const fetchTrafficSuccess = (data) => ({ type: FETCH_TRAFFIC_SUCCESS, payload: data });
const fetchTrafficFailure = (error) => ({ type: FETCH_TRAFFIC_FAILURE, payload: error });
const fetchServicesRequest = () => ({ type: FETCH_SERVICES_REQUEST });
const fetchServicesSuccess = (data) => ({ type: FETCH_SERVICES_SUCCESS, payload: data });
const fetchServicesFailure = (error) => ({ type: FETCH_SERVICES_FAILURE, payload: error });
const fetchJobsRequest = () => ({ type: FETCH_JOBS_REQUEST });
const fetchJobsSuccess = (data) => ({ type: FETCH_JOBS_SUCCESS, payload: data });
const fetchJobsFailure = (error) => ({ type: FETCH_JOBS_FAILURE, payload: error });


export const fetchOrdersData = ({ siteName, startDate, endDate } = {}) => {
  return async (dispatch) => {
      dispatch(fetchOrdersRequest());
      try {
          const response = await fetchOrdersDataService({ siteName, startDate, endDate });
          const currentStatus = response?.currentStatus;

          const orderDataMap = new Map();
          Object.keys(currentStatus).forEach((dateTime) => {
              const dateLabel = new Date(dateTime).toLocaleString('en-US', {
                  timeZone: 'America/New_York',
                  year: "2-digit",
                  month: '2-digit',
                  day: '2-digit',
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
              });
              const webOrder = currentStatus[dateTime].webOrder || 0;
              const appOrder = currentStatus[dateTime].appOrder || 0;

              if (!orderDataMap.has(dateLabel)) {
                  orderDataMap.set(dateLabel, { totalOrders: 0, webOrders: 0, appOrders: 0 });
              }
              const orderData = orderDataMap.get(dateLabel);
              orderData.totalOrders += webOrder + appOrder;
              orderData.webOrders += webOrder;
              orderData.appOrders += appOrder;
              orderDataMap.set(dateLabel, orderData);
          });

          const sortedOrdersData = Array.from(orderDataMap.entries()).map(([label, data]) => ({
              label,
              totalOrders: data.totalOrders,
              webOrders: data.webOrders,
              appOrders: data.appOrders,
          }));
          sortedOrdersData.sort((a, b) => new Date(a.label) - new Date(b.label));

          dispatch(fetchOrdersSuccess({
              labels: sortedOrdersData.map(item => item.label),
              data: sortedOrdersData.map(item => item.totalOrders),
              webData: sortedOrdersData.map(item => item.webOrders),
              appData: sortedOrdersData.map(item => item.appOrders),
              status: response?.status,
          }));
      } catch (error) {
          console.error("Fetch Orders Error:", error.message); // Logging error
          dispatch(fetchOrdersFailure(error.message));
      }
  };
};

export const fetchTrafficData = ({ siteName, startDate, endDate } = {}) => {
  return async (dispatch) => {
      dispatch(fetchTrafficRequest());
      try {
          const data = await fetchTrafficDataService(startDate, endDate, siteName);
          dispatch(fetchTrafficSuccess(data));
      } catch (error) {
          console.error("Fetch Traffic Error:", error.message); 
          dispatch(fetchTrafficFailure(error.message));
      }
  };
};

export const fetchServicesData = ({ siteName, startDate, endDate, serviceName } = {}) => {
  return async (dispatch) => {
      dispatch(fetchServicesRequest());
      try {
          const data = await fetchServicesDataService(siteName, startDate, endDate, serviceName);
          dispatch(fetchServicesSuccess(data));
          return data; 
      } catch (error) {
          console.error("Fetch Services Error:", error.message); 
          dispatch(fetchServicesFailure(error.message));
      }
  };
};

export const fetchJobsData = ({ siteName, startDate, endDate, jobName } = {}) => {
  return async (dispatch) => {
      dispatch(fetchJobsRequest());
      try {
          const data = await fetchJobsDataService(siteName, startDate, endDate, jobName);
          dispatch(fetchJobsSuccess(data));
      } catch (error) {
          console.error("Fetch Jobs Error:", error.message); 
          dispatch(fetchJobsFailure(error.message));
      }
  };
};
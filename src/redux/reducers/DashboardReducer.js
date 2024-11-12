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

const initialState = {
  ordersData: {
      labels: [],
      data: [],
      appData: [],
      webData: [],
      status: null,
  },
  trafficData: null,
  services: null,
  jobs: null,
  loading: false,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_ORDERS_REQUEST:
      case FETCH_TRAFFIC_REQUEST:
      case FETCH_SERVICES_REQUEST:
      case FETCH_JOBS_REQUEST:
          return {
              ...state,
              loading: true,
          };

      case FETCH_ORDERS_SUCCESS:
          return {
              ...state,
              loading: false,
              ordersData: action.payload,
              error: null,
          };

      case FETCH_TRAFFIC_SUCCESS:
          return {
              ...state,
              loading: false,
              trafficData: action.payload,
              error: null,
          };

      case FETCH_SERVICES_SUCCESS:
          return {
              ...state,
              loading: false,
              services: action.payload,
              error: null,
          };

      case FETCH_JOBS_SUCCESS:
          return {
              ...state,
              loading: false,
              jobs: action.payload,
              error: null,
          };

      case FETCH_ORDERS_FAILURE:
      case FETCH_TRAFFIC_FAILURE:
      case FETCH_SERVICES_FAILURE:
      case FETCH_JOBS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };

      default:
          return state;
  }
};

export default dashboardReducer;
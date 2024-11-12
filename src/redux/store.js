import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducers';
import logger from 'redux-logger';
import dashboardReducer from './reducers/DashboardReducer';
import { apiReducer } from './reducers/ApiReducers';
import siteReducer from './reducers/SiteReducers';
import fileReducer from './reducers/UploadReducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    apiHealthCheck: apiReducer,
    sitesData: siteReducer,
    upload: fileReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});

export default store;

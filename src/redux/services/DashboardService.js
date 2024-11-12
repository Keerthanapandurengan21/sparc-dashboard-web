
import axios from 'axios';
import { formatDate } from '../../helpers/FormatDate';
import { REST_END_POINTS } from '../../RestEndPoints';

export const fetchOrdersData = async ({ siteName, startDate, endDate } = {}) => {
  const defaultStartDate = startDate || "2024-08-11T07:13:54";
  const defaultEndDate = endDate || "2024-10-17T18:31:54";

  const response = await axios.post(REST_END_POINTS.GET_ORDERS, {
    "datetime~geq": defaultStartDate,
    "datetime~leq": defaultEndDate,
    site: siteName,
  });

  return response.data;
};

export const fetchTrafficData = async (startDate, endDate, siteName) => {
  const response = await axios.post(REST_END_POINTS.GET_CLOUDFARE_DATA, {
    "datetime~geq": startDate || formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
    "datetime~leq": endDate || formatDate(new Date().toISOString()),
    site: siteName,
  });

  return response.data;
};

export const fetchServicesData = async (siteName,startDate,endDate,serviceName) => {
  const response = await axios.post(REST_END_POINTS.GET_SERVICE_STS, {
    "datetime~geq": startDate || formatDate(new Date(Date.now() - 60 * 60 * 1000)),
    "datetime~leq": endDate || formatDate(new Date()),
    site: siteName,
    serviceName:serviceName
  });

  return response.data;
};

export const fetchJobsData = async (siteName , startDate, endDate,jobName) => {
  console.log(startDate, endDate, siteName,jobName)
  const response = await axios.post(REST_END_POINTS.GET_JOB_STATUS, {
    "datetime~geq": startDate || formatDate(new Date(Date.now() - 60 * 60 * 1000)),
    "datetime~leq": endDate || formatDate(new Date()),
    site: siteName,
    jobName:jobName
  });

  return response.data;
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../ui/header/Header";
import Dashboard from "../dashboard/Dashboard";

// Import Redux actions
import {
  fetchOrdersData,
  fetchTrafficData,
  fetchServicesData,
  fetchJobsData,
} from "../../redux/actions/DashboardActions";

const DashboardPage = () => {
  const dispatch = useDispatch();
  
  const ordersData = useSelector((state) => state?.dashboard?.ordersData);
  const trafficData = useSelector((state) => state.dashboard.trafficData);
  const services = useSelector((state) => state.dashboard.services);
  const jobs = useSelector((state) => state.dashboard.jobs);
  
  const siteName = localStorage.getItem("selectedSite");

  const metricColors = {

    400: "rgba(255, 165, 0, 1)",
    401: "rgba(255, 69, 0, 1)",
    403: "rgba(0, 100, 0, 1)",
    404: "rgba(0, 128, 128, 1)",
    410: "rgba(255, 215, 0, 1)",
    429: "rgba(72, 61, 139, 1)",

    500: "rgba(178, 34, 34, 1)",
    501: "rgba(165, 42, 42, 1)",
    502: "rgba(75, 0, 130, 1)",
    503: "rgba(138, 43, 226, 1)",
    504: "rgba(72, 61, 139, 1)",
  };

  const fetchAllApiData = (siteName) => {
    dispatch(fetchOrdersData({ siteName }));
    dispatch(fetchTrafficData({siteName}));
    dispatch(fetchServicesData({siteName}));
    dispatch(fetchJobsData({siteName}));
  };

  useEffect(() => {
    if (siteName) {
      fetchAllApiData(siteName);
      const interval = setInterval(() => {
        fetchAllApiData(siteName);
      }, 3600000); 
      return () => clearInterval(interval);
    }
  }, [siteName, dispatch]);

  const fetchFilteredApiData = async (startDate, endDate,filterTitle) => {
    try {
      if (filterTitle?.includes("Orders")) {
        await dispatch(fetchOrdersData({siteName ,startDate, endDate}));
      }
      if (filterTitle?.includes("Traffic")) {
        await dispatch(fetchTrafficData({siteName , startDate, endDate}));
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const onFilterSubmit = (startDate, endDate , filterTitle) => {
    fetchFilteredApiData(startDate, endDate, filterTitle);
  };

  const prepareTrafficData = () => {
    const metricsMap = {};
    const uniqueTimestamps = new Set();
    trafficData?.data?.forEach((item) => {
      if (item.dateTime) {
        const date = new Date(item.dateTime);
        if (!isNaN(date.getTime())) {
          const formattedDateTime = date.toLocaleString('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
          uniqueTimestamps.add(formattedDateTime);
        }
      }
    });

    const uniqueTimestampArray = Array.from(uniqueTimestamps).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    trafficData?.data?.forEach((item) => {
      const color = metricColors[item.metric] || "rgba(0, 0, 0, 1)";
      if (!metricsMap[item.metric]) {
        metricsMap[item.metric] = {
          label: item.metric,
          data: Array(uniqueTimestampArray.length).fill(null),
          borderColor: color,
        };
      }
      const date = new Date(item.dateTime);
      const formattedDateTime = date.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      const timestampIndex = uniqueTimestampArray.indexOf(formattedDateTime);
      if (timestampIndex !== -1) {
        metricsMap[item.metric].data[timestampIndex] = item.count;
      }
    });

    return {
      labels: uniqueTimestampArray,
      datasets: Object.values(metricsMap).map((metric) => ({
        ...metric,
        fill: false,
      })),
    };
  };

  return (
    <div>
      <Header
        siteName={siteName}
        fetchApiData={fetchAllApiData}
      />
      <Dashboard
        ordersData={ordersData}
        trafficData={trafficData}
        services={services}
        jobs={jobs}
        prepareTrafficData={prepareTrafficData}
        siteName={siteName}
        onFilterSubmit={onFilterSubmit}
      />
    </div>
  );
};

export default DashboardPage;

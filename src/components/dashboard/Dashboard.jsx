import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import Sidebar from "../ui/Sidebar/Sidebar";
import "./Dashboard.scss";
import noDataFound from "../../assests/Images/NoData.png";
import StatusIndicator from "../ui/statusIndicator/StatusIndicator";
import StatusTable from "../ui/statusTable/StatusTable";
import FilterModal from "../ui/filterModal/FilterModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({
  ordersData,
  trafficData,
  services,
  jobs,
  prepareTrafficData,
  siteName,
  onFilterSubmit,
}) => {

  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isTrafficModalOpen, setIsTrafficModalOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);

  const handleOpenModal = (type) => {
    switch (type) {
      case "orders":
        setIsOrdersModalOpen(true);
        break;
      case "traffic":
        setIsTrafficModalOpen(true);
        break;
      case "services":
        setIsServicesModalOpen(true);
        break;
      case "jobs":
        setIsJobsModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = (type) => {
    switch (type) {
      case "orders":
        setIsOrdersModalOpen(false);
        break;
      case "traffic":
        setIsTrafficModalOpen(false);
        break;
      case "services":
        setIsServicesModalOpen(false);
        break;
      case "jobs":
        setIsJobsModalOpen(false);
        break;
      default:
        break;
    }
  };

  const handleFilterSubmit = (filterData) => {
    onFilterSubmit(filterData.startDate, filterData.endDate, filterData?.filterTitle);
    handleCloseModal(filterData.type);
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <div className="graphs">
            <div className="graph">
              <div className="orders-over-time-container">
                <h3>Total Orders Over Time</h3>
                <div className="current-status-container">
                  <h5>Current Status</h5>
                  <StatusIndicator status={ordersData?.status} />
                </div>
              </div>
              <h3
                className="filter-link"
                onClick={() => handleOpenModal("orders")}
              >
                Filter
              </h3>
              {ordersData && ordersData?.data?.length > 0 ? (
                <Line
                  data={{
                    labels: ordersData?.labels,
                    datasets: [
                      {
                        label: "Web Orders",
                        data: ordersData?.webData,
                        borderColor: "#3e95cd",
                        fill: false,
                      },
                      {
                        label: "App Orders",
                        data: ordersData?.appData,
                        borderColor: "red",
                        fill: false,
                        stepped: true,
                        pointRadius: 10,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        min:
                          Math.min(...ordersData?.data, ...ordersData?.appData) >
                          0
                            ? 0
                            : Math.min(
                                ...ordersData.data,
                                ...ordersData.appData
                              ),
                        max:
                          Math.max(...ordersData.data, ...ordersData.appData) *
                          1.1,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="no-data-message">
                  <img src={noDataFound} alt="No Data Found" />
                </div>
              )}
            </div>
            <div className="graph">
              <div className="orders-over-time-container">
                <h3>HTTP Traffic Status Codes Over Time</h3>
                <div className="current-status-container">
                  <h5>Current Status</h5>
                  <StatusIndicator status={trafficData?.status} />
                </div>
              </div>
              <h3
                className="filter-link"
                onClick={() => handleOpenModal("traffic")}
              >
                Filter
              </h3>
              {prepareTrafficData()?.datasets &&
              prepareTrafficData().datasets.length > 0 ? (
                <Line
                  data={{
                    labels: prepareTrafficData()?.labels,
                    datasets: prepareTrafficData()?.datasets,
                  }}
                />
              ) : (
                <div className="no-data-message">
                  <img src={noDataFound} alt="No Data Found" />
                </div>
              )}
            </div>
          </div>
          <div className="tables">
            <StatusTable
              title="Service Status Overview"
              status={services?.status}
              data={services?.currentStatus}
              siteName={siteName}
              open={isServicesModalOpen}
              handleClose={() => handleCloseModal("services")}
              handleSubmit={() => handleFilterSubmit("services")}
              handleOpenModal={() => handleOpenModal("services")}
              type={"services"}
              instanceOptions={["SandBox" , "Staging" , "Production"]}
            />
            <StatusTable
              title="Job Status Overview"
              status={jobs?.status}
              data={jobs?.currentStatus}
              siteName={siteName}
              open={isJobsModalOpen}
              handleClose={() => handleCloseModal("jobs")}
              handleSubmit={() => handleFilterSubmit("jobs")}
              handleOpenModal={() => handleOpenModal("jobs")}
              type={"jobs"}
              instanceOptions={["SandBox" , "Staging" , "Production"]}
            />
          </div>
        </div>
      </div>
      {isOrdersModalOpen && (
        <FilterModal
          open={isOrdersModalOpen}
          handleClose={() => handleCloseModal("orders")}
          handleSubmit={handleFilterSubmit}
          filterTitle="Filter Orders"
          type="orders"
        />
      )}

      {isTrafficModalOpen && (
        <FilterModal
          open={isTrafficModalOpen}
          handleClose={() => handleCloseModal("traffic")}
          handleSubmit={handleFilterSubmit}
          filterTitle="Filter Traffic"
          type = "traffic"
        />
      )}
    </>
  );
};

export default Dashboard;

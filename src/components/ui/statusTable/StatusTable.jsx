import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServicesData,
  fetchJobsData,
} from "../../../redux/actions/DashboardActions";
import MaterialTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StatusIndicator from "../../ui/statusIndicator/StatusIndicator";
import TablePagination from "@mui/material/TablePagination";
import { Line } from "react-chartjs-2";
import FilterModal from "../filterModal/FilterModal";
import { formatDate } from "../../../helpers/FormatDate";
import "./StatusTable.scss";

const StatusTable = ({
  title,
  status,
  data,
  open,
  handleClose,
  handleOpenModal,
  instanceOptions,
  type,
}) => {
  const dispatch = useDispatch();
  const { services, jobs, loading, error } = useSelector((state) => state.dashboard);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openChart, setOpenChart] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterSubmitted, setFilterSubmitted] = useState(false);

  const transformedData = data
    ? Object.keys(data).map((key) => ({
        [type === "services" ? "serviceName" : "jobName"]: key.trim(),
        ...Object.keys(data[key]).reduce((acc, statusKey) => {
          acc[statusKey.toLowerCase()] = data[key][statusKey];
          return acc;
        }, {}),
      }))
    : [];

  const headers = [
    { key: type === "services" ? "serviceName" : "jobName", label: type === "services" ? "Service Name" : "Job Name" },
    { key: "error", label: "Error" },
    { key: "ok", label: "OK" },
    {
      key: type === "services" ? "service_unavailable" : "job_invalid",
      label: type === "services" ? "Service Unavailable" : "Job Invalid",
    },
  ];

  const getCellStyle = (value, key) => {
    const colorMap = {
      error: "red",
      ok: "green",
      unavailable: "orange",
    };
    return {
      fontWeight: 700,
      color: colorMap[key.toLowerCase()] || "inherit",
    };
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpenChart(true);
    const siteName = localStorage.getItem("selectedSite");
    const startDateFormatted = startDate || "2024-10-19T06:21:00";
    const endDateFormatted = endDate || "2024-10-19T07:10:00";

    if (type === "services") {
      dispatch(fetchServicesData({ siteName, startDate: startDateFormatted, endDate: endDateFormatted, serviceName: row.serviceName }));
    } else {
      dispatch(fetchJobsData({ siteName, startDate: startDateFormatted, endDate: endDateFormatted, jobName: row.jobName }));
    }
  };

  useEffect(() => {
    // Handle fetching data when services or jobs change
    if (services || jobs) {
      // Logic to set chart data or any other state based on the fetched data
    }
  }, [services, jobs]);

  const chartData = services || jobs ? {
    labels: (services?.data || jobs?.data)?.map((item) => new Date(item?.dateTime || item?.startTime).toLocaleString("en-US")),
    datasets: [
      {
        label: "Success Rate",
        data: (services?.data || jobs?.data)?.map((item) => item?.status === "OK" ? 1 : null),
        borderColor: "green",
        fill: false,
      },
      {
        label: "Error Rate",
        data: (services?.data || jobs?.data)?.map((item) => item?.status === "error" ? 1 : null),
        borderColor: "red",
        fill: false,
      },
      {
        label: "Unavailability Rate",
        data: (services?.data || jobs?.data)?.map((item) => item.status === "SERVICE_UNAVAILABLE" ? 1 : null),
        borderColor: "orange",
        fill: false,
      },
    ],
  } : null;

  return (
    <>
      <div className="table-section">
        <div className="orders-over-time-container">
          <h3>{title}</h3>
          <div className="current-status-container">
            <h5>Current Status:</h5>
            <StatusIndicator status={status} />
          </div>
        </div>
        <h3 className="filter-link" onClick={() => handleOpenModal(title.includes("Service") ? "services" : "jobs")}>
          Filter
        </h3>
        <TableContainer component={Paper}>
          <MaterialTable>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header.key} sx={{ textAlign: "center", fontWeight: 700 }}>
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(transformedData.length > 0 ? transformedData : []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} onClick={() => handleOpen(row)} style={{ cursor: "pointer" }}>
                    {headers.map((header) => (
                      <TableCell key={header.key} sx={{ textAlign: "center", ...getCellStyle(row[header.key], header.key) }}>
                        {row[header.key] ?? "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </MaterialTable>
          <TablePagination
            rowsPerPageOptions={[6, 12, 24]}
            component="div"
            count={transformedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        {openChart && chartData && (
          <div className="custom-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedRow?.serviceName ?? selectedRow?.jobName} - Status Over Time</h2>
                <span className="close-btn" onClick={() => setOpenChart(false)}>&times;</span>
              </div>
              <Line data={chartData} />
            </div>
          </div>
        )}
      </div>
      <FilterModal
        open={open}
        handleClose={handleClose}
        handleSubmit={(filterData) => {
          setStartDate(filterData.startDate);
          setEndDate(filterData.endDate);
          setFilterSubmitted(true);
          handleClose();
        }}
        filterTitle={title.includes("Service") ? "Filter Service Data" : "Filter Job Data"}
        type={title.includes("Service") ? "services" : "jobs"}
        instanceOptions={instanceOptions}
      />
    </>
  );
};

export default StatusTable;
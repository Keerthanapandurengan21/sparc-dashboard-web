import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import Sidebar from "../ui/Sidebar/Sidebar";
import Header from "../ui/header/Header";
import Loader from "../ui/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { fetchApiData } from "../../redux/actions/ApiActions";
import "./ApiHealthCheck.scss";


const processData = (data) => {
  const allUrls = [];
  let totalUrls = 0;
  let totalErrors = 0;
  Object.entries(data).forEach(([sectionKey, sectionValue]) => {
    const sectionFailedCount = Object.values(sectionValue).filter(
      ([, statusCode]) => statusCode >= 400
    ).length;
    allUrls.push({
      section: sectionKey,
      urls: sectionValue,
      failedCount: sectionFailedCount,
    });
    totalUrls += Object.keys(sectionValue).length;
    totalErrors += sectionFailedCount;
  });
  const errorPercentage = totalUrls > 0 ? (totalErrors / totalUrls) * 100 : 0;
  let overallStatusColor;
  if (errorPercentage <= 10) {
    overallStatusColor = "green";
  } else if (errorPercentage > 10 && errorPercentage <= 19) {
    overallStatusColor = "blue";
  } else if (errorPercentage >= 20 && errorPercentage <= 29) {
    overallStatusColor = "yellow";
  } else if (errorPercentage >= 30 && errorPercentage <= 49) {
    overallStatusColor = "orange";
  } else {
    overallStatusColor = "red";
  }
  return {
    totalUrls,
    totalErrors,
    errorPercentage,
    overallStatusColor,
    allUrls,
  };
};


const getStatusIcon = (statusCode) => {
  if (statusCode >= 400) return <ErrorIcon color="error" />;
  if (statusCode === 200 || statusCode === 302)
    return <CheckCircleIcon color="success" />;
  return <ReportProblemIcon color="warning" />;
};


const ApiHealthCheck = () => {
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.apiHealthCheck.apiData);
  const loading = useSelector((state) => state.apiHealthCheck.loading);
  const error = useSelector((state) => state.apiHealthCheck.error);
  const currentStatus = useSelector((state) => state.apiHealthCheck.currentStatus);


  const [expandedSections, setExpandedSections] = useState({});
  const [selectedAppSource, setSelectedAppSource] = useState("web");
  const siteName = localStorage.getItem("selectedSite");


  useEffect(() => {
    if (siteName && selectedAppSource) {
      dispatch(fetchApiData(siteName, selectedAppSource));
    }
  }, [dispatch, selectedAppSource]);


  const handleAccordionToggle = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };


  const handleAppSourceChange = (event) => {
    const newAppSource = event.target.value;
    setSelectedAppSource(newAppSource);
  };

  const handleSiteChange = (newSite) => {
    if (newSite && selectedAppSource) {
      dispatch(fetchApiData(newSite, selectedAppSource));
    }
  };


  const {
    totalUrls,
    totalErrors,
    errorPercentage,
    overallStatusColor,
    allUrls,
  } = apiData
    ? processData(apiData)
    : {
        totalUrls: 0,
        totalErrors: 0,
        errorPercentage: 0,
        overallStatusColor: "green",
        allUrls: [],
      };


  return (
    <>
      <Header onSiteChange={handleSiteChange} />
      <div className="api-health-check">
        <Sidebar />
        <Box sx={{ padding: 3 }} className="api-box">
          {loading ? (
            <Loader />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <Box className={`summary-container ${overallStatusColor}`}>
                <Typography variant="h6" className="summary-header">
                  Website health check
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    className={`status-indicator ${overallStatusColor}`}
                  >
                    <span style={{ backgroundColor: overallStatusColor }} />
                    <Typography className="summary-text">
                      Total URLs: {totalUrls} | Total Errors: {totalErrors} |
                      Error Percentage: {errorPercentage.toFixed(2)}%
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ padding: 3 }}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>App Source</InputLabel>
                    <Select
                      value={selectedAppSource}
                      label="App Source"
                      onChange={handleAppSourceChange}
                    >
                      <MenuItem value="web">Web</MenuItem>
                      <MenuItem value="mobile">Mobile</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {allUrls.map(({ section, urls, failedCount }) => {
                let accordionClass = "error-none";
                if (failedCount > 0) {
                  accordionClass = failedCount < 3 ? "error-low" : "error-high";
                }
                const sectionErrorPercentage =
                currentStatus[section]?.errorPercentage || "N/A";
                return (
                  <Accordion
                    key={section}
                    className={`MuiAccordion-root ${accordionClass}`}
                    expanded={expandedSections[section] ?? true}
                    onChange={() => handleAccordionToggle(section)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-${section}-content`}
                      id={`panel-${section}-header`}
                      className="accordion-summary"
                    >
                      <Box className="accordion-header">
                        <Typography
                          variant="p"
                          className="accordion-section-title"
                        >
                          {section.toUpperCase()}
                        </Typography>
                        <Typography
                          className={`accordion-error-percentage ${
                            sectionErrorPercentage > 20 ? "red" : ""
                          }`}
                        >
                          (Error Percentage: {sectionErrorPercentage}%)
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {Object.entries(urls).map(([category, value], idx) => {
                        const [url, statusCodeStr] = value.split(" : ");
                        const statusCode = parseInt(statusCodeStr, 10);
                        let nestedAccordionClass;


                        if (
                          (statusCode >= 200 && statusCode < 300) ||
                          statusCode === 302
                        ) {
                          nestedAccordionClass = "error-none";
                        } else if (statusCode >= 300 && statusCode < 399) {
                          nestedAccordionClass = "error-moderate";
                        } else if (statusCode >= 400 && statusCode < 499) {
                          nestedAccordionClass = "error-low";
                        } else if (statusCode >= 500) {
                          nestedAccordionClass = "error-high";
                        }


                        return (
                          <Accordion
                            key={category}
                            className={`nested-accordion ${nestedAccordionClass}`}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel-${category}-content`}
                              id={`panel-${category}-header`}
                              className={`accordion-header ${nestedAccordionClass}`}
                            >
                              <Typography>{category.toUpperCase()}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <TableContainer component={Paper}>
                                <Table>
                                  <TableBody>
                                    <TableRow key={idx}>
                                      <TableCell align="center">
                                        <a
                                          href={url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {url}
                                        </a>
                                      </TableCell>
                                      <TableCell align="center">
                                        {getStatusIcon(statusCode)}
                                      </TableCell>
                                      <TableCell align="center">
                                        {`Status code - ${statusCode}`}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </>
          )}
        </Box>
      </div>
    </>
  );
};


export default ApiHealthCheck;

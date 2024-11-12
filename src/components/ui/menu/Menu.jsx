import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import FileUpload from "../fileUpload/FileUpload";
import "./Menu.scss";
import Header from "../header/Header";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("job");
  const [siteName, setSiteName] = useState(localStorage.getItem("selectedSite"));

  useEffect(() => {
    const handleStorageChange = () => {
      setSiteName(localStorage.getItem("selectedSite"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  const handleSiteChange = (newSite) => {
    setSiteName(newSite); 
  };


  return (
    <>
      <Header siteName={siteName} onSiteChange={handleSiteChange} />
      <div className="menu">
        <Sidebar />
        <div className="upload-container">
          <div className="upload-tabs">
            <button 
              className={`tab-button ${activeTab === 'job' ? 'active' : ''}`}
              onClick={() => setActiveTab("job")}
            >
              Upload Job Files
            </button>
            <button 
              className={`tab-button ${activeTab === 'site' ? 'active' : ''}`}
              onClick={() => setActiveTab("site")}
            >
              Upload Site Files
            </button>
          </div>

          <div className="upload-content">
            {activeTab === "job" && (
              <FileUpload
                title="Upload Job Files"
                uploadType="job"
                apiEndpoint={`${process.env.REACT_APP_API_URL}/api/v1/dashboard/upload-job`}
                siteName={siteName} 
              />
            )}
            {activeTab === "site" && (
              <FileUpload
                title="Upload Site Files"
                uploadType="site"
                apiEndpoint={`${process.env.REACT_APP_API_URL}/api/v1/dashboard/upload-sitedata`}
                defaultSite={siteName}
                siteName={siteName} 
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

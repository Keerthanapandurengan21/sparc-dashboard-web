import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBars,
  FaHeartbeat,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.scss";

const Sidebar = () => {
  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("selectedSite");
    navigate("/");
  };

  const navigate = useNavigate();
  const siteName = localStorage.getItem("selectedSite");

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <FaTachometerAlt />
          </Link>
        </li>
        <li>
          <Link to={`/menu`}>
            <FaBars />
          </Link>
        </li>
        <li>
          <Link to={`/api-health-check`}>
            <FaHeartbeat />
          </Link>
        </li>
        <li>
          <Link to="/" onClick={handleSignOut}>
            <FaSignOutAlt />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

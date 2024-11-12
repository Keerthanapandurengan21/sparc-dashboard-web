import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIHealthCheck from "./components/apiHealthCheck/ApiHealthCheck";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/ui/protectedRoute/ProtectedRoute";
import DashboardPage from "./components/dashboard/DashboardPage";
import Menu from "./components/ui/menu/Menu";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/api-health-check"
            element={
              <ProtectedRoute>
                <APIHealthCheck />
              </ProtectedRoute>
            }
          />

          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";

import LoginPage from "./Pages/LoginPage.jsx";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import AddCustomerPage from "./Pages/AddCustomerPage";
import CenterReportPage from "./Pages/CenterReportPage";

import AddSalesExecutivePage from "./Pages/AddSalesExecutivePage";
import SalesExecutiveDashboardPage from "./Pages/SalesExecutiveDashboardPage";

axios.defaults.baseURL =
  "https://www.threelioncredits.in:5443";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
	  <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/center" element={<CenterReportPage />} />
          <Route
            path="/admin/addsalesexec"
            element={<AddSalesExecutivePage />}
          />
          <Route
            path="/sales-exec/addcustomer"
            element={
              <ProtectedRouteSalesExec>
                <AddCustomerPage />
              </ProtectedRouteSalesExec>
            }
          />
          <Route
            path="/sales-exec/dashboard"
            element={
              <ProtectedRouteSalesExec>
                <SalesExecutiveDashboardPage />
              </ProtectedRouteSalesExec>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRouteSalesExec = ({ children }) => {
  const isSalesExecAuthorized =
    localStorage.getItem("SalesExec-authorized") === "true";
  const isAdminAuthorized = localStorage.getItem("Admin-authorized") === "true";

  if (isSalesExecAuthorized || isAdminAuthorized) {
    return children;
  } else {
    // Redirect to login if not authorized
    return <Navigate to="/login" />;
  }
};

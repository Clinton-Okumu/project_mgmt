import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/RegisterPage";
import AuthGuard from "./pages/AuthGuard";
import Dashboard from "./pages/DashboardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Protected route for the dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/RegisterPage";
import Dashboard from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import MainLayout from "./layouts/MainLayout";
import NewProjectPge from "./pages/NewProjectPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/*public routes*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/*Protected routes inside mainlayout*/}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/newprojects" element={<NewProjectPge />} />
        </Route>

        {/*default fallback*/}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

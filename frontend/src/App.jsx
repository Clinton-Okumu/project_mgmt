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
import ArchivedPage from "./pages/ArchivedPage";
import HelpPage from "./pages/HelpPage";
import ProjectDetails from "./pages/ProjectDetailsPage";

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
                    <Route path="/new-project" element={<NewProjectPge />} />
                    <Route path="/archived" element={<ArchivedPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                </Route>

                {/*default fallback*/}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;

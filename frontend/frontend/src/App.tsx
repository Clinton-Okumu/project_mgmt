import React, { ReactNode, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";

interface DashboardProps {
  user: any; // Replace 'any' with the actual type of your user object
}

// Assume your Dashboard component expects a 'user' prop
const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return <div>Dashboard for user: {user.name}</div>; // Example usage
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [user, setUser] = useState<any | null>(null); // State to hold user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      // Replace this with your actual API call to fetch user data using the token
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
          // Make an API call to get user data using the token
          const response = await fetch("/api/user", {
            // Replace '/api/user' with your actual endpoint
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Handle error fetching user data, maybe redirect to login
            localStorage.removeItem("token");
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return <Dashboard user={user} />; // Pass the fetched user data as a prop
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={<AuthGuard />} // AuthGuard now handles rendering Dashboard with user
        />

        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

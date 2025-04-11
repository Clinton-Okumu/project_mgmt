import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/RegisterPage";

// Assume your Dashboard component expects a 'user' prop
const Dashboard = ({ user }) => {
  return <div>Dashboard for user: {user ? user.name : "Guest"}</div>; // Example usage
};

const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [user, setUser] = useState(null); // State to hold user data
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

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

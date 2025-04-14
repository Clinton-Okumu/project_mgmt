import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiRequest } from "../services/ApiService"; // Adjust the path if needed

const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem("access") !== null;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      if (isAuthenticated) {
        const userId = localStorage.getItem("userId"); // Assuming you store it here

        if (userId) {
          try {
            const response = await apiRequest("get", `users/${userId}`); // Construct the URL with the ID
            setUser(response);
          } catch (error) {
            console.error("Error fetching user data:", error);
            localStorage.removeItem("access");
            localStorage.removeItem("userId"); // Also clear the userId if fetching fails
            setUser(null);
          } finally {
            setLoading(false);
          }
        } else {
          // Handle the case where access token is present but userId is not
          console.warn("Access token found, but userId is missing.");
          localStorage.removeItem("access");
          setUser(null);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return children; // Render the protected component
};

export default AuthGuard;

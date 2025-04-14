import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getToken = (type) => {
  return localStorage.getItem(type);
};

export const apiRequest = async (method, url, data = null, headers = {}) => {
  const token = getToken("access");

  const config = {
    method,
    url: `${API_URL}${url}`,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(method !== "get" && { data }),
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("access");
      throw new Error("Session expired. Please log in again.");
    }

    console.error("API Error:", error.response?.data);
    throw new Error(error.response?.data?.detail || "API request failed");
  }
};

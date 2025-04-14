import { apiRequest } from "./ApiService";

const setToken = (type, token) => {
  localStorage.setItem(type, token);
};

export const registerUser = async (userData) => {
  const response = await apiRequest("post", "register", userData);
  setToken("access", response.token);
  return response;
};

export const loginUser = async (credentials) => {
  const response = await apiRequest("post", "login", credentials);
  setToken("access", response.token);
  return response;
};

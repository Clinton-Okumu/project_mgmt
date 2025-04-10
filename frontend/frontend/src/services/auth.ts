import { apiRequest } from "./api"; // Import the generic apiRequest function

interface RegisterPayload {
  email: string;
  password: string;
  // Add other registration fields as needed
}

interface RegisterResponse {
  id: string; // Or whatever the backend returns on successful registration
  email: string;
  // Add other response fields as needed
}

export const registerUser = async (
  userData: RegisterPayload,
): Promise<RegisterResponse> => {
  return apiRequest<RegisterResponse>("post", "register", userData, {}, false); // No auth needed
};

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const setToken = (type: "access", token: string): void => {
  localStorage.setItem(type, token);
};

export const loginUser = async (
  credentials: LoginPayload,
): Promise<LoginResponse> => {
  const response = await apiRequest<LoginResponse>(
    "post",
    "login",
    credentials,
    {},
    false,
  ); // No auth needed
  // Store the token upon successful login
  setToken("access", response.token);
  return response;
};

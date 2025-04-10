import { apiRequest } from "./api.ts";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
}

export const registerUser = async (
  userData: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await apiRequest<RegisterResponse>(
    "post",
    "register",
    userData,
  );
  setToken("access", response.token);
  return response;
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
  );
  setToken("access", response.token);
  return response;
};

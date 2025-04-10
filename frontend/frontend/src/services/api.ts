import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api1.tech-thrive.software/api/";

const getToken = (type: "access"): string | null => {
  return localStorage.getItem(type);
};

let navigate: ReturnType<typeof useNavigate> | null = null;

export const setNavigate = (nav: ReturnType<typeof useNavigate>) => {
  navigate = nav;
};

export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data: unknown = null,
  headers: Record<string, string> = {},
): Promise<T> => {
  const token = getToken("access");

  if (!token) {
    if (navigate) {
      navigate("/login");
      throw new Error("Authentication required");
    } else {
      throw new Error("Missing token and no navigation setup.");
    }
  }

  const config: AxiosRequestConfig = {
    method,
    url: `${API_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    ...(method !== "get" && { data }),
  };

  try {
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ detail?: string }>;

    if (err.response?.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      if (navigate) {
        navigate("/login");
      }
      throw new Error("Session expired. Please log in again.");
    }

    console.error("API Error:", err.response?.data);
    throw new Error(err.response?.data?.detail || "API request failed");
  }
};

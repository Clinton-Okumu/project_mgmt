import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const API_URL = "https://api1.tech-thrive.software/api/";

const getToken = (type: "access"): string | null => {
  return localStorage.getItem(type);
};

export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data: unknown = null,
  headers: Record<string, string> = {},
): Promise<T> => {
  const token = getToken("access");

  const config: AxiosRequestConfig = {
    method,
    url: `${API_URL}${url}`,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
      throw new Error("Session expired. Please log in again.");
    }

    console.error("API Error:", err.response?.data);
    throw new Error(err.response?.data?.detail || "API request failed");
  }
};

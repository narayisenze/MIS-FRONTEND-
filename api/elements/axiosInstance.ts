import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const requestHandler = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers = config.headers || {};
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const responseHandler = (response: AxiosResponse): AxiosResponse => response;

const errorHandler = (error: AxiosError): Promise<never> => {
  return Promise.reject(
    (error.response && error.response.data) || "Something went wrong"
  );
};

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => requestHandler(config),
  (error: AxiosError) => errorHandler(error)
);

API.interceptors.response.use(
  (response: AxiosResponse) => responseHandler(response),
  (error: AxiosError) => errorHandler(error)
);

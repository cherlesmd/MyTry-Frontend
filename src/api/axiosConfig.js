import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://13.57.209.43:8080/api/v1",
  timeout: 20000,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "http://13.57.209.43:8080/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 20000,
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(res => {
  console.log(res)
  return res;
}, error => Promise.reject(error));

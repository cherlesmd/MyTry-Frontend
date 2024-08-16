import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://www.mytrybackend.codes/api/v1",
  timeout: 20000,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "https://www.mytrybackend.codes/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(res => {
  console.log(res)
  return res;
}, error => Promise.reject(error));

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mytrybackend-88bc8727b196.herokuapp.com/api/v1",
  timeout: 20000,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "https://mytrybackend-88bc8727b196.herokuapp.com/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


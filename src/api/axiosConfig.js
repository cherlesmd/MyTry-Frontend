import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 20000,
  headers: {
    "Content-type": "application/json",
  },
});

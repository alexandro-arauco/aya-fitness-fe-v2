import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  //baseURL: "http://167.99.179.228:8000/api/v1",
});

export default axiosInstance;

import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



export default axiosInstance;
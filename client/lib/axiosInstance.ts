import axios from "axios";
import API_BASE_URL from "./api";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/`,
});

export default API;

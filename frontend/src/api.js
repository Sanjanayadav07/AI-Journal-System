import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const API = axios.create({
  baseURL: `${API_URL}/api`
});

/*
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api"
});
*/
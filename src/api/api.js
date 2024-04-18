import axios from "axios";

export const api = axios.create({
  
  baseURL: "http://localhost:5101",
  headers: {
    "Content-Type": "application/json",
  },
});

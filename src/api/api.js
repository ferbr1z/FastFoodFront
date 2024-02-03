import axios from "axios";

export const api = axios.create({
  
  baseURL: "http://192.168.40.4:5101",
  headers: {
    "Content-Type": "application/json",
  },
});

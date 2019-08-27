import axios from "axios";

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: process.env.API_URL || "http://localhost:1337"
});

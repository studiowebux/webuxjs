import axios from "axios";
import getCookies from "./getCookies";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://demo.webux.lab/api"
  // withCredentials: true
});

http.interceptors.request.use(async config => {
  const value = await getCookies("accessToken");
  if (!value) {
    return config;
  }
  config.headers.Authorization = `Bearer ${value}`;

  return config;
});

http.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    console.error(error);
    let msg = "";
    if (error.response) {
      msg =
        error.response.data.message ||
        error.response.data ||
        "An error occured while contacting the server.";
    }

    return Promise.reject(msg);
  }
);

export default http;

import axios from "axios";
import getCookies from "./getCookies";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://127.0.0.1:1337/api/v1"
  // withCredentials: true
});

http.interceptors.request.use(async config => {
  console.log("Try to set the Authorization header");
  const value = await getCookies("accessToken");
  if (!value) {
    return;
  }
  config.headers.Authorization = `Bearer ${value}`;

  return config;
});

http.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log(response);
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

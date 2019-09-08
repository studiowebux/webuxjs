import axios from "axios";

const http = axios.create({
  baseURL: process.env.API_URL || "http://localhost:1337/api/v1"
});

http.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${window.$cookies.get("accessToken")}`;
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
        error.response.data.message || error.response.data || "An error occur";
    }

    return Promise.reject(msg);
  }
);

export default http;

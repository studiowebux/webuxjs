import axios from "axios";
import store from "../store";
import router from "../router";

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
    if (error.response && error.response.status === 403) {
      store.dispatch("logout");
      router.push("/signin").catch(() => {
        /* Nothing to do */
      });
    }

    const msg = error.response.data.message || error.response.data;
    return Promise.reject(msg);
  }
);

export default http;

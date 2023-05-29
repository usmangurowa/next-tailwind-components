import Axios from "axios";
import { getCookie } from "cookies-next";
const axios = Axios.create({
  baseURL: "", // provide base url here
});

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getCookie("token")}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axios;

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {},
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;

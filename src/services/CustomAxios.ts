import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // redirect to login
    }
    return Promise.reject(error);
  }
);

export default instance;

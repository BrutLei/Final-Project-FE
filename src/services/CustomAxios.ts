import axios from "axios";
import Cookies from "js-cookie";

const clerkCookie = Cookies.get("__clerk_db_jwt");
const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: clerkCookie,
  },
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

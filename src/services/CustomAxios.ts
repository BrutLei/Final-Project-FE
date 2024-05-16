import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});
instance.interceptors.response.use(
  function (response) {
    if (response) {
      console.log(response);

      return response.data;
    }
  },
  function (error) {
    console.log(">>>Error Check: ", error.response.data);
    let res: { data?: any; status?: any; headers?: any } = {}; // Add type for 'res' variable
    if (error.response) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      console.log(">>>Error request: ", error.message);
    }
    return Promise.reject(res);
  }
);

export default instance;

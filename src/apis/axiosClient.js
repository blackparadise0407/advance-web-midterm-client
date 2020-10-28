import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      console.log("== Response data ==", response.data);
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log("== Error ==", error);

    // if (error.response.status === 401) {
    //   history.push("/login");
    // }
    // if (error.response.status === 404) {
    //   history.push("/not-found");
    // }
    // if (error.response.status === 500) {
    //   history.push("/server-error");
    // }
    throw error;
  }
);

export default axiosClient;

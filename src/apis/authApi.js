import axiosClient from "./axiosClient";

const authApi = {
  register: (body) => {
    const url = "/register";
    return axiosClient.post(url, body);
  },
  login: (body) => {
    const url = "/login";
    return axiosClient.post(url, body);
  },
};

export default authApi;

import axiosClient from "./axiosClient";

const authApi = {
  auth: (config) => {
    const url = '/auth';
    return axiosClient.get(url, config);
  },
  register: (body) => {
    const url = "/auth/register";
    return axiosClient.post(url, body);
  },
  login: (body) => {
    const url = "/auth/login";
    return axiosClient.post(url, body);
  },
  updateProfile: (body, config) => {
    const url = '/auth/update';
    return axiosClient.post(url, body, config)
  },
  googleSignIn: (body) => {
    const url = '/auth/google/callback';
    return axiosClient.post(url, body)
  },
  facebookSignIn: (body) => {
    const url = '/auth/facebook/callback';
    return axiosClient.post(url, body)
  },
};

export default authApi;

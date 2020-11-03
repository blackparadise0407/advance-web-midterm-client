import axiosClient from "./axiosClient";

const boardApi = {
  getAll: (config) => {
    const url = "/board";
    return axiosClient.get(url, config);
  },
  getByID: (id, config) => {
    const url = `/board/${id}`;
    return axiosClient.get(url, config);
  },
};

export default boardApi;

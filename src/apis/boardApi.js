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
  addAction: (id, body, config) => {
    const url = `/board/${id}/action`;
    return axiosClient.post(url, body, config);
  },
  removeAction: (id, body, config) => {
    const url = `/board/${id}/remove-action`;
    return axiosClient.post(url, body, config);
  },
};

export default boardApi;

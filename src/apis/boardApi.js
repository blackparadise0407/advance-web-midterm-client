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
  removeBoard: (id, config) => {
    const url = `/board/${id}`;
    return axiosClient.delete(url, config);
  },
  addBoard: (body, config) => {
    const url = `/board`;
    return axiosClient.post(url, body, config);
  },
  update: (id, body, config) => {
    const url = `/board/${id}`;
    return axiosClient.post(url, body, config);
  },
  updateAction: (id, body, config) => {
    const url = `/board/${id}/update-action`;
    return axiosClient.post(url, body, config);
  }
};

export default boardApi;

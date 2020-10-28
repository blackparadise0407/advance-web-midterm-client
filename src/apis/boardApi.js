import axiosClient from "./axiosClient";

const boardApi = {
  getAll: () => {
    const url = "/board";
    return axiosClient.get(url);
  },
  getByID: (id) => {
    const url = `/board/${id}`;
    return axiosClient.get(url);
  },
};

export default boardApi;

import axiosClient from './axiosClient';

const styleApi = {
  getStyle: () => axiosClient.get(`/Styles/list`),
};

export default styleApi;

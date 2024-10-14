import axiosClient from './axiosClient';

const serviceApi = {

    getServices: () => axiosClient.get('/v1/service/list'),
};

export default serviceApi;
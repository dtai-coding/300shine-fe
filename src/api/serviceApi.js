import internal from 'stream';
import axiosClient from './axiosClient';

const serviceApi = {

    getServices: () => axiosClient.get('/v1/service/list'),

    getServiceById: (id) => axiosClient.get(`/v1/service/service-by-id`, { params: { id } }),

    getServicesBySalonId: (id) => axiosClient.get('/v1/salon/salon-by-id', { params: { id } }),

};

export default serviceApi;
import axiosClient from './axiosClient';

const salonApi = {

    getSalons: () => axiosClient.get('/v1/salon/list'),

};

export default salonApi;
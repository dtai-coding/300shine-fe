import axiosClient from './axiosClient';

const serviceApi = {
  getServices: () => axiosClient.get(`/v1/service/list`),

  getServiceById: (id) => axiosClient.get(`/v1/service/service-by-id`, { params: { id } }),

  getServicesBySalonId: (id) => axiosClient.get(`/v1/salon/salon-by-id`, { params: { id } }),

  getServiceByStylistId: (stylistId) =>
    axiosClient.get(`/v1/service/list-by-stylist`, { params: { stylistId } }),

  createServices: (data) => axiosClient.post(`v1/service/new`, data),
  updateServices: (data) => axiosClient.put(`/v1/service`, data),
  deleteServices: (id) => axiosClient.delete(`/v1/service?id=${id}`),
};

export default serviceApi;

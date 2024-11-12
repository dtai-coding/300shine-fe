import internal from 'stream';
import axiosClient from './axiosClient';

const salonApi = {
  getSalons: () => axiosClient.get('/v1/salon/list'),

  getSalonById: async (salonId) => {
    try {
      return await axiosClient.get(`/v1/salon/salon-by-id?id=${salonId}`);
    } catch (error) {
      console.error('Error fetching salon by ID:', error);
      throw error;
    }
  },

  addSalon: async (data) => {
    try {
      return await axiosClient.post('/v1/salon/new', data);
    } catch (error) {
      console.error('Error adding salon:', error);
      throw error;
    }
  },

  updateSalon: async (data) => {
    try {
      return await axiosClient.put(`/v1/salon`, data);
    } catch (error) {
      console.error('Error updating salon:', error);
      throw error;
    }
  },

  deleteSalon: async (salonId) => {
    try {
      return await axiosClient.delete(`/v1/salon?id=${salonId}`);
    } catch (error) {
      console.error('Error deleting salon:', error);
      throw error;
    }
  },
};

export default salonApi;

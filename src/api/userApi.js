// src/api/userApi.js

import axiosClient from './axiosClient';

const userApi = {
  getUsers: async () => {
    try {
      return await axiosClient.get('/User');
    } catch (error) {
      console.error('Error fetching user count:', error);
      throw error;
    }
  },
  getUserStatistics: async () => {
    try {
      const response = await axiosClient.get('/v1/user');
      return response;
    } catch (error) {
      console.error('Error fetching user count:', error);
      throw error;
    }
  },

};
export default userApi;
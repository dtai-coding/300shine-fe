import axiosClient from './axiosClient';

const userApi = {
  getUsers: async () => {
    try {
      return await axiosClient.get('/users');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      return await axiosClient.get(`/user/${userId}`);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  },

  addStylist: async (data) => {
    try {
      return await axiosClient.post('/stylist/create', data);
    } catch (error) {
      console.error('Error adding stylist:', error);
      throw error;
    }
  },

  addManager: async (data) => {
    try {
      return await axiosClient.post('/manager/create', data);
    } catch (error) {
      console.error('Error adding manager:', error);
      throw error;
    }
  },

  updateUser: async (userId, data) => {
    try {
      return await axiosClient.put(`/api/${userId}`, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      return await axiosClient.delete(`/api/${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default userApi;

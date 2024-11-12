import axiosClient from './axiosClient';

const userApi = {
  getStylists: async () => {
    try {
      return await axiosClient.get('/users?roleId=4');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  getCustomers: async () => {
    try {
      return await axiosClient.get('/users?roleId=3');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

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
      return await axiosClient.put(`/${userId}`, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      return await axiosClient.delete(`/${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default userApi;

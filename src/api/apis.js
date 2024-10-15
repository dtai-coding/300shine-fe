import axiosClient from './axiosClient';

const APIs_URL = {
  LOGIN: '/v1/login',
  REGISTER: '/v1/register',
  GET_USER_BY_PHONE: '/v1/User/get-user-by-phone',
  GET_USER_BY_ID: '/v1/User',
};

export const loginAPI = async (data) => {
  console.log('Sending login request with payload:', data);
  const response = await axiosClient.post(APIs_URL.LOGIN, data);
  console.log('Login response:', response);
  return response; // Return the data from the response
};

export const registerAPI = async (data) => {
  const response = await axiosClient.post(APIs_URL.REGISTER, data);
  return response.data; // Return response data instead of full response
};

export const getUserByPhoneAPI = async (phone) => {
  try {
    console.log('Fetching customer details for phone:', phone);
    const encodedPhone = encodeURIComponent(phone); // Encode email parameter
    const response = await axiosClient.get(
      `${APIs_URL.GET_USER_BY_PHONE}?email=${encodedPhone}`
    );
    console.log('Customer details response:', response);
    return response; // Return response data instead of full response
  } catch (error) {
    console.error('Get customer by email API error:', error.response || error.message);
    throw error;
  }
};

export const getUserByIdAPI = async (id) => {
  try {
    console.log('Fetching customer details for id:', id);
    const response = await axiosClient.get(
      `${APIs_URL.GET_USER_BY_ID}/${id}`
    );
    console.log('Customer details response:', response);
    return response; // Return response data instead of full response
  } catch (error) {
    console.error('Get customer by Id API error:', error.response || error.message);
    throw error;
  }
};

export const convertToFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value) && value.length && value[0] instanceof File) {
      value.forEach((file) => {
        formData.append(key, file);
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, `${value}`);
    }
  });
  return formData;
};

export default axiosClient;

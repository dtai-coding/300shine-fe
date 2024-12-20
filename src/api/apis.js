import axiosClient from './axiosClient';

const APIs_URL = {
  LOGIN: '/v1/login',
  REGISTER: '/v1/register',
  GET_USER_BY_PHONE: '/User',
  GET_USER_BY_ID: '/User',
};

export const loginAPI = async (data) => {
  const response = await axiosClient.post(APIs_URL.LOGIN, data);
  console.log('Login response:', response);
  return response;
};

export const registerAPI = async (data) => {
  const response = await axiosClient.post(APIs_URL.REGISTER, data);
  console.log('Login response:', response);
  return response;
};

export const getUserByPhoneAPI = async (phone) => {
  try {
    console.log('Fetching customer details for phone:', phone);
    const encodedPhone = encodeURIComponent(phone);
    const response = await axiosClient.get(`${APIs_URL.GET_USER_BY_PHONE}/${encodedPhone}`);
    console.log('Customer details response:', response);
    return response;
  } catch (error) {
    console.error('Get customer by email API error:', error.response || error.message);
    throw error;
  }
};

export const getUserByIdAPI = async (id) => {
  try {
    console.log('Fetching customer details for id:', id);
    const response = await axiosClient.get(`${APIs_URL.GET_USER_BY_ID}/${id}`);
    console.log('Customer details response:', response);
    return response;
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

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    // Ensure the URL is correct, and you are passing the formData as the second parameter
    const response = await axiosClient.post(
      'https://localhost:7073/api/Photo/upload-photo', // The full URL to your upload endpoint
      formData, // The formData object with the file
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Setting the content type
        },
      }
    );

    // Return the response data, assuming it contains the image URL or relevant data
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export default axiosClient;

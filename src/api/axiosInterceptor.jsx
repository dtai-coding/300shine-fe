import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuthStore } from 'src/stores';
import axiosClient from 'src/api/axiosClient';

const AxiosInterceptor = () => {
  const accessToken = useAuthStore((state) => state.auth.accessToken);

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = (config) => {
      // console.log('Request interceptor triggered');
      // console.log(accessToken)
      const customHeader = {};
      if (accessToken) {
        customHeader.Authorization = `Bearer ${accessToken}`;
      }
      return {
        ...config,
        headers: {
          ...customHeader,
          ...config.headers,
        },
      };
    };

    const requestErrorInterceptor = (error) => {
      console.log('Request error interceptor triggered:', error);
      return Promise.reject(error);
    };

    // Response Interceptor
    const responseInterceptor = (response) => {
      // console.log('Response interceptor triggered:', response);
    
      // Check if the response has the "value" and "data" properties
      if (response?.data?.value) {
        // console.log('list', response.data.value);
        return response.data.value;  // This should return the users array directly
      }
    
      // Fallback in case of different structure
      return response || {};
    };

    const responseErrorInterceptor = async (error) => {
      console.log(error);
      // Handle errors from the backend
      if (error.response) {
        if (error.response.data.value) {
          return Promise.reject(error.response.data.value);
        }

        if (error.response.data.message) {
          return Promise.reject(error.response.data.message);
        }
      }
      if (error.message) {
        return Promise.reject(error.message);
      }
      return Promise.reject(new Error('An unexpected error occurred!'));
    };

    const interceptorReq = axiosClient.interceptors.request.use(
      requestInterceptor,
      requestErrorInterceptor
    );
    const interceptorRes = axiosClient.interceptors.response.use(
      responseInterceptor,
      responseErrorInterceptor
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosClient.interceptors.request.eject(interceptorReq);
      axiosClient.interceptors.response.eject(interceptorRes);
    };
  }, [accessToken]);

  return <Outlet />;
};

export default AxiosInterceptor;

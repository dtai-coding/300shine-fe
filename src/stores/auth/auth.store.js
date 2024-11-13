import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { loginAPI, registerAPI } from 'src/api/apis';

const storeApi = (set, get) => ({
  auth: {
    status: 'unauthorized',
    accessToken: localStorage.getItem('accessToken') || undefined,
    refreshToken: undefined,
    user: undefined,
  },
  loginUser: async (payload) => {
    console.log('Sending login request with payload:', payload);
    const response = await loginAPI(payload);

    if (!response || !response.data.token) {
      throw new Error('Invalid login response');
    }

    const accessToken = response.data.token; // Ensure response.value contains the accessToken
    const refreshToken = response.value || 'dummyRefreshToken';
    console.log('JWT :', accessToken, ', \n RefreshToken :', refreshToken);

    // const userResponse = await getUserByPhoneAPI(payload.phone);
    // if (!userResponse || !userResponse.data) {
    //   throw new Error('Invalid user details response');
    // }
    localStorage.setItem('accessToken', accessToken);

    const userInfo = response.data.user;

    // const userInfo = {
    // phone: payload.phone,
    // ...userResponse.data,
    // };

    // if (userResponse.value.role === 'customer') {
    //   throw new Error('Not Allowed');
    // }
    set({ auth: { status: 'authorized', accessToken, refreshToken, user: userInfo } });
    const currentState = get().auth;
    console.log('UserState', currentState);
  },
  catch(error) {
    console.error('Login error:', error);
    set({
      auth: {
        status: 'unauthorized',
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined,
      },
    });
    console.log('Credential incorrect:', error);
  },
  logoutUser: () => {
    localStorage.removeItem('accessToken');
    set({
      auth: {
        status: 'unauthorized',
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined,
      },
    });
  },
  registerUser: async (payload) => {
    await registerAPI(payload);
  },
});

export const useAuthStore = create()(devtools(persist(storeApi, { name: 'auth-storage' })));

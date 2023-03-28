import axios from 'axios';
import { redirect } from 'react-router-dom';

import { refreshApi } from '../api/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((request)=> {
  if (request.headers) {
    const storageToken = request.url === '/auth/refresh' ? localStorage.getItem('refreshToken') : localStorage.getItem('accessToken');
    request.headers.Authorization = `Bearer ${storageToken}` || null;
  }
  return request;
})

api.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.config.url === '/auth/refresh'
    ) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      redirect('/login');
      return Promise.reject(error);
    } else if (error.response && error.response.status === 401) {
      const { accessToken } = await refreshApi();
      localStorage.setItem('accessToken', accessToken);
      return axios({
        ...error.config,
        headers: {
          Authorization: `Bearer ${accessToken}` || null,
        },
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };

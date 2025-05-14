// axiosInstance.ts
import axios from 'axios';
import store from '../Store/AppStore';
import { startLoading, stopLoading } from '../Store/Slices/LoadingSlice';
import { setError } from '../Store/Slices/ErrorSlice';

axios.interceptors.request.use(
  config => {
    store.dispatch(startLoading());
    return config;
  },
  error => {
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    store.dispatch(stopLoading());
    return response;
  },
  error => {
    store.dispatch(stopLoading());
    const status = error.response?.status;
    const message =
      error?.response?.statusText || 'An unexpected error occurred';

    if (status === 401) {
      store.dispatch(setError({ message: 'Session expired. Please log in.', status }));
    } else {
      store.dispatch(setError({ message, status }));
    }
    return Promise.reject(error);
  }
);

import Config from './config';
import axios from 'axios';

export const AxiosClient = (function () {
  let instance: any;
  let tokenInstance: string;

  function createAxiosClient(token: string) {
    const axiosInstance = axios.create({
      baseURL: `${Config.apiUrl}/wp-json/`,
    });
    // Add a request interceptor
    if (token !== '') {
      axiosInstance.interceptors.request.use(
        (config) => {
          // Add the bearer JWT token to the request headers
          const { headers } = config;
          headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    return axiosInstance;
  }

  return {
    create(token: string) {
      this.set(token);
    },
    get(token: string) {
      if (
        tokenInstance !== token ||
        !instance
      ) {
        this.set(token);
      }
      return instance;
    },
    set(token: string) {
      instance = createAxiosClient(token);
      tokenInstance = token;
    },
  };
})();

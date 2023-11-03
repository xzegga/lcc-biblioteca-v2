import Config from './config';
import axios from 'axios';

export const AxiosClient = (function () {
  let instance: any;
  let tokenInstance: string;

  function createAxiosClient(token: string, multipart = false) {
    const axiosInstance = axios.create({
      baseURL: `${Config.apiUrl}/wp-json/`,
      ...(multipart ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : {}),
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
          console.log({ error });
          return Promise.reject(error);
        }
      );
    }

    return axiosInstance;
  }

  return {
    create(token: string, multipart?: boolean) {
      this.set(token, multipart);
    },
    get(token: string, multipart?: boolean) {
      if (
        tokenInstance !== token ||
        !instance
      ) {
        this.set(token, multipart);
      }
      return instance;
    },
    set(token: string, multipart?: boolean) {
      instance = createAxiosClient(token, multipart);
      tokenInstance = token;
    },
  };
})();

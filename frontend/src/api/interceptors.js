import { authStorage } from "../storage/authStorage";

export function setupInterceptors(axiosClient) {
  axiosClient.interceptors.request.use(
    (config) => {
      const token = authStorage.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        authStorage.clearSession();
      }

      return Promise.reject(error);
    }
  );
}
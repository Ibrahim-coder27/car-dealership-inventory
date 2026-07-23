import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";

const authService = {
  async login(credentials) {
    const response = await axiosClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    return response.data.data;
  },

  async register(userData) {
    const response = await axiosClient.post(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );

    return response.data.data;
  },
};

export default authService;
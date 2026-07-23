import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";

const vehicleService = {
  async getAllVehicles() {
    const response = await axiosClient.get(API_ENDPOINTS.VEHICLES.BASE);
    return response.data.data;
  },

  async searchVehicles(filters) {
    const response = await axiosClient.get(API_ENDPOINTS.VEHICLES.SEARCH, {
      params: filters,
    });
    return response.data.data;
  },

  async purchaseVehicle(id, quantity) {
    const response = await axiosClient.post(
      `${API_ENDPOINTS.VEHICLES.BASE}/${id}/purchase`,
      { quantity }
    );
    return response.data.data;
  },

  async restockVehicle(id, quantity) {
    const response = await axiosClient.post(
      `${API_ENDPOINTS.VEHICLES.BASE}/${id}/restock`,
      { quantity }
    );
    return response.data.data;
  },

  async createVehicle(vehicleData) {
    const response = await axiosClient.post(
      API_ENDPOINTS.VEHICLES.BASE,
      vehicleData
    );
    return response.data.data;
  },

  async updateVehicle(id, vehicleData) {
    const response = await axiosClient.put(
      `${API_ENDPOINTS.VEHICLES.BASE}/${id}`,
      vehicleData
    );
    return response.data.data;
  },

  async deleteVehicle(id) {
    const response = await axiosClient.delete(
      `${API_ENDPOINTS.VEHICLES.BASE}/${id}`
    );
    return response.data;
  },
};

export default vehicleService;

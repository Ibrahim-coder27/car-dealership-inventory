const Vehicle = require("../models/vehicle.model");

const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

const getAllVehicles = async () => {
  return await Vehicle.find();
};

const getVehicleById = async (id) => {
  return await Vehicle.findById(id);
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
};
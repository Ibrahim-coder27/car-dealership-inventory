const Vehicle = require("../models/vehicle.model");
const AppError = require("../utils/AppError");

const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

const getAllVehicles = async () => {
  return await Vehicle.find();
};

const getVehicleById = async (id) => {
  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return vehicle;
};


module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
};
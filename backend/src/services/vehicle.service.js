const Vehicle = require("../models/vehicle.model");

const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

const getAllVehicles = async () => {
  return await Vehicle.find();
};

module.exports = {
  createVehicle,
  getAllVehicles,
};
const Vehicle = require("../models/vehicle.model");

const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

module.exports = {
  createVehicle,
};
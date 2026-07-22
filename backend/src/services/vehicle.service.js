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

const updateVehicle = async (id, vehicleData) => {
  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    id,
    vehicleData,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  if (!updatedVehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return updatedVehicle;
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
};
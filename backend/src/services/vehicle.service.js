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

const deleteVehicle = async (id) => {
  const deletedVehicle = await Vehicle.findByIdAndDelete(id);

  if (!deletedVehicle) {
    throw new AppError("Vehicle not found", 404);
  }
};

const searchVehicles = async (query) => {
  const filter = {};

  if (query.make) {
    filter.make = {
      $regex: query.make,
      $options: "i",
    };
  }

  if (query.model) {
    filter.model = {
      $regex: query.model,
      $options: "i",
    };
  }

  if (query.category) {
    filter.category = {
      $regex: query.category,
      $options: "i",
    };
  }

  return await Vehicle.find(filter);
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  searchVehicles,
};
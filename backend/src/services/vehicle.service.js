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

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

  return await Vehicle.find(filter);
};

const purchaseVehicle = async (id, purchaseData) => {
  const { quantity } = purchaseData;

  if (quantity <= 0) {
    throw new AppError(
      "Purchase quantity must be greater than 0",
      400
    );
  }

  const vehicle = await getVehicleById(id);

  if (quantity > vehicle.quantity) {
    throw new AppError(
      "Insufficient stock available",
      400
    );
  }

  vehicle.quantity -= quantity;

  await vehicle.save();

  return vehicle;
};

const restockVehicle = async (id, restockData) => {
  const { quantity } = restockData;

  const vehicle = await getVehicleById(id);

  vehicle.quantity += quantity;

  await vehicle.save();

  return vehicle;
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  searchVehicles,
  purchaseVehicle,
  restockVehicle,
};
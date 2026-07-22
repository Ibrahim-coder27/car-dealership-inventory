const Vehicle = require("../models/vehicle.model");
const AppError = require("../utils/AppError");

const {
  mapVehicleResponse,
  mapVehicleListResponse,
} = require("../utils/vehicleResponse");

const getVehicleDocument = async (id) => {
  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return vehicle;
};

const createVehicle = async (vehicleData) => {
  const vehicle = await Vehicle.create(vehicleData);

  return mapVehicleResponse(vehicle);
};

const getAllVehicles = async () => {
  const vehicles = await Vehicle.find();

  return mapVehicleListResponse(vehicles);
};

const getVehicleById = async (id) => {
  const vehicle = await getVehicleDocument(id);

  return mapVehicleResponse(vehicle);
};

const updateVehicle = async (id, vehicleData) => {
  const vehicle = await Vehicle.findByIdAndUpdate(
  id,
  vehicleData,
  {
    returnDocument: "after",
    runValidators: true,
  }
);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return mapVehicleResponse(vehicle);
};

const deleteVehicle = async (id) => {
  const vehicle = await Vehicle.findByIdAndDelete(id);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }
};

const purchaseVehicle = async (id, purchaseData) => {
  const { quantity } = purchaseData;

  if (quantity <= 0) {
    throw new AppError(
      "Purchase quantity must be greater than 0",
      400
    );
  }

  const vehicle = await getVehicleDocument(id);

  if (vehicle.quantity < quantity) {
    throw new AppError(
      "Insufficient stock available",
      400
    );
  }

  vehicle.quantity -= quantity;

  await vehicle.save();

  return mapVehicleResponse(vehicle);
};

const restockVehicle = async (id, restockData) => {
  const { quantity } = restockData;

  if (quantity <= 0) {
    throw new AppError(
      "Restock quantity must be greater than 0",
      400
    );
  }

  const vehicle = await getVehicleDocument(id);

  vehicle.quantity += quantity;

  await vehicle.save();

  return mapVehicleResponse(vehicle);
};

/**
 * Search vehicles using optional filters
 */
const searchVehicles = async (filters) => {
  const {
    make,
    model,
    category,
    minPrice,
    maxPrice,
  } = filters;

  const query = {};

  if (make) {
    query.make = {
      $regex: make,
      $options: "i",
    };
  }

  if (model) {
    query.model = {
      $regex: model,
      $options: "i",
    };
  }

  if (category) {
    query.category = {
      $regex: category,
      $options: "i",
    };
  }

  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  const vehicles = await Vehicle.find(query);

  return mapVehicleListResponse(vehicles);
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
  searchVehicles,
};
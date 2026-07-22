const vehicleService = require("../services/vehicle.service");
const asyncHandler = require("../utils/asyncHandler");

const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.body);

  res.status(201).json({
    success: true,
    data: vehicle,
  });
});

const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await vehicleService.getAllVehicles();

  res.status(200).json({
    success: true,
    data: vehicles,
  });
});

const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.getVehicleById(req.params.id);

  res.status(200).json({
    success: true,
    data: vehicle,
  });
});

const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.updateVehicle(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    data: vehicle,
  });
});

const deleteVehicle = asyncHandler(async (req, res) => {
  await vehicleService.deleteVehicle(req.params.id);

  res.status(200).json({
    success: true,
    message: "Vehicle deleted successfully",
  });
});

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
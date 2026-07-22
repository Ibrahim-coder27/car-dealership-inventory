const Vehicle = require("../models/vehicle.model");

const createVehicle = async (overrides = {}) => {
  const vehicle = await Vehicle.create({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 4200000,
    quantity: 5,
    ...overrides,
  });

  return vehicle;
};

module.exports = {
  createVehicle,
};
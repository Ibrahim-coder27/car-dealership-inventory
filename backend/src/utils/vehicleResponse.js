const mapVehicleResponse = (vehicle) => {
  return {
    ...vehicle.toObject(),
    availability:
      vehicle.quantity > 0
        ? "In Stock"
        : "Out of Stock",
  };
};

const mapVehicleListResponse = (vehicles) => {
  return vehicles.map(mapVehicleResponse);
};

module.exports = {
  mapVehicleResponse,
  mapVehicleListResponse,
};  
const addAvailability = (vehicle) => ({
  ...vehicle.toObject(),
  availability:
    vehicle.quantity > 0 ? "In Stock" : "Out of Stock",
});

module.exports = addAvailability;
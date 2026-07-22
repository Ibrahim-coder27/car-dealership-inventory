const express = require("express");

const router = express.Router();

const vehicleController = require("../controllers/vehicle.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");

router.post(
  "/",
  authMiddleware,
  vehicleController.createVehicle
);

router.get(
  "/",
  authMiddleware,
  vehicleController.getAllVehicles
);

router.get(
  "/:id",
  authMiddleware,
  validateObjectId,
  vehicleController.getVehicleById
);

router.put(
  "/:id",
  authMiddleware,
  validateObjectId,
  vehicleController.updateVehicle
);

module.exports = router;
const express = require("express");

const router = express.Router();

const vehicleController = require("../controllers/vehicle.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  vehicleController.createVehicle
);

router.get("/", vehicleController.getAllVehicles);

module.exports = router;
const express = require("express");

const router = express.Router();

const vehicleController = require("../controllers/vehicle.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");

router.get("/", vehicleController.getAllVehicles);
router.get(
  "/:id",
  validateObjectId,
  vehicleController.getVehicleById
);
router.post(
  "/",
  authMiddleware,
  vehicleController.createVehicle
);


module.exports = router;
const express = require("express");

const router = express.Router();

const vehicleController = require("../controllers/vehicle.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.getVehicleById);
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  vehicleController.createVehicle
);


module.exports = router;
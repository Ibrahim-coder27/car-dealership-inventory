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
  "/search",
  authMiddleware,
  vehicleController.searchVehicles
);

router.post(
  "/:id/purchase",
  authMiddleware,
  validateObjectId,
  vehicleController.purchaseVehicle
);

router.post(
  "/:id/restock",
  authMiddleware,
  authorize("admin"),
  validateObjectId,
  vehicleController.restockVehicle
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

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validateObjectId,
  vehicleController.deleteVehicle
);


module.exports = router;
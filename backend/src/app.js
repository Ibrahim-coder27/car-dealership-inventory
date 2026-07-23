const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware"); 
const vehicleRoutes = require("./routes/vehicle.routes"); 

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use(errorHandler);

module.exports = app;
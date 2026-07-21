const express = require("express");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");  

const app = express();

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
app.use(errorHandler);

module.exports = app;
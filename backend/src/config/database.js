const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "car_dealership";

  return mongoose.connect(uri, {
    dbName: dbName,
  });
};

module.exports = connectDB;
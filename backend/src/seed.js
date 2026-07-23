require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const Vehicle = require("./models/vehicle.model");

const dummyVehicles = [
  {
    make: "Tesla",
    model: "Model Y",
    category: "SUV",
    price: 48990,
    quantity: 6,
  },
  {
    make: "Toyota",
    model: "Camry Hybrid",
    category: "Sedan",
    price: 28850,
    quantity: 12,
  },
  {
    make: "Ford",
    model: "F-150 Lightning",
    category: "Truck",
    price: 54995,
    quantity: 4,
  },
  {
    make: "Honda",
    model: "Civic Type R",
    category: "Hatchback",
    price: 44795,
    quantity: 2,
  },
  {
    make: "BMW",
    model: "X5 M Sport",
    category: "SUV",
    price: 67500,
    quantity: 0, // Out of stock demo
  },
  {
    make: "Chevrolet",
    model: "Silverado 1500",
    category: "Truck",
    price: 42300,
    quantity: 7,
  },
  {
    make: "Mercedes-Benz",
    model: "C-Class Sedan",
    category: "Sedan",
    price: 46900,
    quantity: 3,
  },
  {
    make: "Hyundai",
    model: "Ioniq 5 EV",
    category: "SUV",
    price: 41450,
    quantity: 1, // Low stock demo
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding...");

    await Vehicle.deleteMany({});
    console.log("Cleared existing vehicle collection.");

    const created = await Vehicle.insertMany(dummyVehicles);
    console.log(`Successfully seeded ${created.length} vehicles into database!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();

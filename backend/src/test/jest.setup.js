const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.test",
  quiet: true,
});

beforeAll(async () => {
  const connectDB = require("../config/database");
  await connectDB();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
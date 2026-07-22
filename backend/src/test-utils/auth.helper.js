const jwt = require("jsonwebtoken");

const createAdminToken = () => {
  return jwt.sign(
    {
      id: "507f191e810c19729de860ea",
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createCustomerToken = () => {
  return jwt.sign(
    {
      id: "507f191e810c19729de860eb",
      role: "customer",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

module.exports = {
  createAdminToken,
  createCustomerToken,
};
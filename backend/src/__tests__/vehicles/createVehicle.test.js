const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");

describe("Create Vehicle", () => {

test("should allow an admin to create a vehicle", async () => {
  const adminToken = jwt.sign(
    {
      id: "507f191e810c19729de860ea",
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  const response = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 4200000,
      quantity: 5,
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.success).toBe(true);
});

test("should allow customer to create a vehicle", async () => {
  const customerToken = createCustomerToken();

  const response = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${customerToken}`)
    .send({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 4200000,
      quantity: 5,
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.success).toBe(true);
});
});
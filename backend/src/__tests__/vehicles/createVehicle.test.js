const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");

describe("Create Vehicle", () => {
  test("should allow an admin to create a vehicle", async () => {
  const response = await request(app)
    .post("/api/vehicles")
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

test("should return 403 when customer tries to create a vehicle", async () => {
  const customerToken = jwt.sign(
    {
      id: "507f191e810c19729de860ea",
      role: "customer",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

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

  expect(response.statusCode).toBe(403);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Access denied");
});
});
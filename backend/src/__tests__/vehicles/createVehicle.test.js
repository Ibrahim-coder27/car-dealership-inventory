const request = require("supertest");
const app = require("../../app");

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
});
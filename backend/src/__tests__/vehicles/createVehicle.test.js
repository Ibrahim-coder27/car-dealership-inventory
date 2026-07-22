const request = require("supertest");
const app = require("../../app");

const {
  createAdminToken,
  createCustomerToken,
} = require("../../test-utils/auth.helper");

describe("Create Vehicle", () => {
  test("should allow an admin to create a vehicle", async () => {
    const adminToken = createAdminToken();

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
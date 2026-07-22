const request = require("supertest");
const app = require("../../app");
const Vehicle = require("../../models/vehicle.model");

describe("Get Vehicle By ID", () => {
  test("should return a vehicle by id", async () => {
    const vehicle = await Vehicle.create({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 4200000,
      quantity: 5,
    });

    const response = await request(app).get(
      `/api/vehicles/${vehicle._id}`
    );

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.make).toBe("Toyota");

    expect(response.body.data.model).toBe("Fortuner");
  });
});
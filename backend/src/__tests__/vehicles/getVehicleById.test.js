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

  test("should return 404 when vehicle does not exist", async () => {
  const response = await request(app).get(
    "/api/vehicles/507f191e810c19729de860ea"
  );

  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Vehicle not found");
});

test("should return 400 when vehicle id is invalid", async () => {
  const response = await request(app).get("/api/vehicles/abc");

  expect(response.statusCode).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Invalid vehicle id");
});

});
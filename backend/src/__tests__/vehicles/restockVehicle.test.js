const request = require("supertest");
const app = require("../../app");
const Vehicle = require("../../models/vehicle.model");

const {
  createAdminToken,
} = require("../../test-utils/auth.helper");

const {
  createVehicle,
} = require("../../test-utils/vehicle.helper");

describe("Restock Vehicle", () => {
  beforeEach(async () => {
    await Vehicle.deleteMany({});
  });

  test("should restock a vehicle successfully", async () => {
    const vehicle = await createVehicle({
      quantity: 10,
    });

    const token = createAdminToken();

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        quantity: 5,
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Vehicle restocked successfully"
    );

    expect(response.body.data.quantity).toBe(15);

    const updatedVehicle = await Vehicle.findById(vehicle._id);

    expect(updatedVehicle.quantity).toBe(15);
  });

  test("should return 404 if vehicle does not exist", async () => {
  const token = createAdminToken();

  const nonExistingId = "507f191e810c19729de860ea";

  const response = await request(app)
    .post(`/api/vehicles/${nonExistingId}/restock`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 5,
    });

  expect(response.statusCode).toBe(404);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe("Vehicle not found");
});

test("should return 400 if restock quantity is less than or equal to zero", async () => {
  const vehicle = await createVehicle({
    quantity: 10,
  });

  const token = createAdminToken();

  const response = await request(app)
    .post(`/api/vehicles/${vehicle._id}/restock`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 0,
    });

  expect(response.statusCode).toBe(400);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe(
    "Restock quantity must be greater than 0"
  );

  const updatedVehicle = await Vehicle.findById(vehicle._id);

  expect(updatedVehicle.quantity).toBe(10);
});

test("should return 400 for an invalid vehicle id", async () => {
  const token = createAdminToken();

  const response = await request(app)
    .post("/api/vehicles/invalid-id/restock")
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 5,
    });

  expect(response.statusCode).toBe(400);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe("Invalid vehicle id");
});

const {
  createCustomerToken,
} = require("../../test-utils/auth.helper");

test("should return 403 when a customer tries to restock a vehicle", async () => {
  const vehicle = await createVehicle({
    quantity: 10,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .post(`/api/vehicles/${vehicle._id}/restock`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 5,
    });

  expect(response.statusCode).toBe(403);

  expect(response.body.success).toBe(false);

  // Match the message used by your authorize middleware.
  expect(response.body.message).toBe("Access denied");

  const updatedVehicle = await Vehicle.findById(vehicle._id);

  expect(updatedVehicle.quantity).toBe(10);
});

});
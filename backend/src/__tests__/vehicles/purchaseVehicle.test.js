const request = require("supertest");
const app = require("../../app");
const Vehicle = require("../../models/vehicle.model");

const {
  createCustomerToken,
} = require("../../test-utils/auth.helper");

const {
  createVehicle,
} = require("../../test-utils/vehicle.helper");

describe("Purchase Vehicle", () => {
  beforeEach(async () => {
    await Vehicle.deleteMany({});
  });

  test("should purchase a vehicle successfully", async () => {
    const vehicle = await createVehicle({
      quantity: 10,
    });

    const token = createCustomerToken();

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        quantity: 3,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Vehicle purchased successfully"
    );

    expect(response.body.data.quantity).toBe(7);

    const updatedVehicle = await Vehicle.findById(vehicle._id);

    expect(updatedVehicle.quantity).toBe(7);
  });

  test("should return 404 if vehicle does not exist", async () => {
    const token = createCustomerToken();

    const nonExistingId = "507f191e810c19729de860ea";

    const response = await request(app)
      .post(`/api/vehicles/${nonExistingId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        quantity: 2,
      });

    expect(response.statusCode).toBe(404);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("Vehicle not found");
  });

  test("should return 400 if purchase quantity is less than or equal to zero", async () => {
  const vehicle = await createVehicle({
    quantity: 10,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .post(`/api/vehicles/${vehicle._id}/purchase`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 0,
    });

  expect(response.statusCode).toBe(400);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe(
    "Purchase quantity must be greater than 0"
  );
});

test("should return 400 if purchase quantity exceeds available stock", async () => {
  const vehicle = await createVehicle({
    quantity: 5,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .post(`/api/vehicles/${vehicle._id}/purchase`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 8,
    });

  expect(response.statusCode).toBe(400);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe(
    "Insufficient stock available"
  );

  const updatedVehicle = await Vehicle.findById(vehicle._id);

  expect(updatedVehicle.quantity).toBe(5);
});

});
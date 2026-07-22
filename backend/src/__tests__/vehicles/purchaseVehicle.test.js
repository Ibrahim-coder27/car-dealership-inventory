const request = require("supertest");
const app = require("../../app");
const Vehicle = require("../../models/vehicle.model");
const {
  createCustomerToken,
} = require("../helpers/auth.helper");
const {
  createVehicle,
} = require("../helpers/vehicle.helper");

describe("Purchase Vehicle", () => {
  beforeEach(async () => {
    await Vehicle.deleteMany({});
  });

  test("should purchase a vehicle successfully", async () => {
    const vehicle = await createVehicle({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 4500000,
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
});
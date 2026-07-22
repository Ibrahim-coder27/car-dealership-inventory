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
});
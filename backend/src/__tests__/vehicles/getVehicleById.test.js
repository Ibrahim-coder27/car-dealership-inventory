const request = require("supertest");
const app = require("../../app");

const { createVehicle } = require("../../test-utils/vehicle.helper");
const { createCustomerToken } = require("../../test-utils/auth.helper");

describe("Get Vehicle By ID", () => {
  test("should return a vehicle by id", async () => {
    const vehicle = await createVehicle();

    const token = createCustomerToken();

    const response = await request(app)
      .get(`/api/vehicles/${vehicle._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.make).toBe(vehicle.make);
    expect(response.body.data.model).toBe(vehicle.model);
  });

  test("should return 404 when vehicle does not exist", async () => {
    const token = createCustomerToken();

    const response = await request(app)
      .get("/api/vehicles/507f191e810c19729de860ea")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Vehicle not found");
  });

  test("should return 400 when vehicle id is invalid", async () => {
    const token = createCustomerToken();

    const response = await request(app)
      .get("/api/vehicles/abc")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid vehicle id");
  });
});
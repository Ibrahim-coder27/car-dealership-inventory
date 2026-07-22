const request = require("supertest");
const app = require("../../app");

const { createVehicle } = require("../../test-utils/vehicle.helper");
const {
  createAdminToken,
  createCustomerToken,
} = require("../../test-utils/auth.helper");

describe("Delete Vehicle", () => {
  test("should allow admin to delete a vehicle", async () => {
    const vehicle = await createVehicle();

    const token = createAdminToken();

    const response = await request(app)
      .delete(`/api/vehicles/${vehicle._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Vehicle deleted successfully"
    );
  });

  test("should return 404 when vehicle does not exist", async () => {
    const token = createAdminToken();

    const response = await request(app)
      .delete("/api/vehicles/507f191e810c19729de860ea")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Vehicle not found");
  });

  test("should return 403 when customer tries to delete a vehicle", async () => {
    const vehicle = await createVehicle();

    const token = createCustomerToken();

    const response = await request(app)
      .delete(`/api/vehicles/${vehicle._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Access denied");
  });

  test("should return 401 when unauthenticated user tries to delete a vehicle", async () => {
    const vehicle = await createVehicle();

    const response = await request(app).delete(
      `/api/vehicles/${vehicle._id}`
    );

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Access token required");
  });

  test("should return 400 when vehicle id is invalid", async () => {
    const token = createAdminToken();

    const response = await request(app)
      .delete("/api/vehicles/invalid-id")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid vehicle id");
  });
});
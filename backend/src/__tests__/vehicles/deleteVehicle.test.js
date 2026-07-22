const request = require("supertest");
const app = require("../../app");

const { createVehicle } = require("../../test-utils/vehicle.helper");
const { createAdminToken } = require("../../test-utils/auth.helper");

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
});
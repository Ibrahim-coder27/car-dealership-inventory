const request = require("supertest");
const app = require("../../app");

const { createVehicle } = require("../../test-utils/vehicle.helper");
const { createCustomerToken } = require("../../test-utils/auth.helper");

describe("Get Vehicles", () => {
  test("should return all vehicles", async () => {
    await createVehicle({
      make: "Toyota",
      model: "Fortuner",
    });

    await createVehicle({
      make: "Honda",
      model: "City",
    });

    const token = createCustomerToken();

    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveLength(2);

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          make: "Toyota",
          model: "Fortuner",
        }),
        expect.objectContaining({
          make: "Honda",
          model: "City",
        }),
      ])
    );
  });
});
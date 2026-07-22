const request = require("supertest");
const app = require("../../app");

const { createCustomerToken } = require("../../test-utils/auth.helper");
const { createVehicle } = require("../../test-utils/vehicle.helper");

describe("Update Vehicle", () => {
  test("should allow customer to update a vehicle", async () => {
    const token = createCustomerToken();

    const vehicle = await createVehicle();

    const response = await request(app)
      .put(`/api/vehicles/${vehicle._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Honda",
        model: "City",
        category: "Sedan",
        price: 1800000,
        quantity: 10,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data.make).toBe("Honda");
    expect(response.body.data.model).toBe("City");
    expect(response.body.data.price).toBe(1800000);
    expect(response.body.data.quantity).toBe(10);
  });
});
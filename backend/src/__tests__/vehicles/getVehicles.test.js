const request = require("supertest");
const app = require("../../app");
const Vehicle = require("../../models/vehicle.model");

describe("Get Vehicles", () => {
  test("should return all vehicles", async () => {
    await Vehicle.create([
      {
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4200000,
        quantity: 5,
      },
      {
        make: "Honda",
        model: "City",
        category: "Sedan",
        price: 1600000,
        quantity: 10,
      },
    ]);

    const response = await request(app).get("/api/vehicles");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveLength(2);

    expect(response.body.data).toHaveLength(2);

    const makes = response.body.data.map((vehicle) => vehicle.make);

    expect(makes).toEqual(expect.arrayContaining(["Toyota", "Honda"]));
  });
});

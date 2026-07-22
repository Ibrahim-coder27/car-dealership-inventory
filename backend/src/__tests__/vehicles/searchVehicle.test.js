const request = require("supertest");
const app = require("../../app");

const { createVehicle } = require("../../test-utils/vehicle.helper");
const { createCustomerToken } = require("../../test-utils/auth.helper");

describe("Search Vehicles", () => {
  test("should search vehicles by make", async () => {
    await createVehicle({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
    });

    await createVehicle({
      make: "Honda",
      model: "City",
      category: "Sedan",
    });

    const token = createCustomerToken();

    const response = await request(app)
      .get("/api/vehicles/search?make=toy")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].make).toBe("Toyota");
  });

  test("should search vehicles by model", async () => {
    await createVehicle({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
    });

    await createVehicle({
      make: "Honda",
      model: "City",
      category: "Sedan",
    });

    const token = createCustomerToken();

    const response = await request(app)
      .get("/api/vehicles/search?model=fort")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].model).toBe("Fortuner");
  });

  test("should search vehicles by category", async () => {
    await createVehicle({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
    });

    await createVehicle({
      make: "Honda",
      model: "City",
      category: "Sedan",
    });

    const token = createCustomerToken();

    const response = await request(app)
      .get("/api/vehicles/search?category=suv")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].category).toBe("SUV");
  });
});
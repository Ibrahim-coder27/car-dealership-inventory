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

  test("should search vehicles by minimum price", async () => {
  await createVehicle({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 1000000,
  });

  await createVehicle({
    make: "Honda",
    model: "City",
    category: "Sedan",
    price: 2000000,
  });

  await createVehicle({
    make: "BMW",
    model: "X5",
    category: "SUV",
    price: 5000000,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .get("/api/vehicles/search?minPrice=2000000")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data).toHaveLength(2);
});

test("should search vehicles by maximum price", async () => {
  await createVehicle({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 1000000,
  });

  await createVehicle({
    make: "Honda",
    model: "City",
    category: "Sedan",
    price: 2000000,
  });

  await createVehicle({
    make: "BMW",
    model: "X5",
    category: "SUV",
    price: 5000000,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .get("/api/vehicles/search?maxPrice=2000000")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data).toHaveLength(2);
});

    test("should search vehicles within a price range", async () => {
  await createVehicle({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 1000000,
  });

  await createVehicle({
    make: "Honda",
    model: "City",
    category: "Sedan",
    price: 2000000,
  });

  await createVehicle({
    make: "BMW",
    model: "X5",
    category: "SUV",
    price: 5000000,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .get("/api/vehicles/search?minPrice=1500000&maxPrice=3000000")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  expect(response.body.data).toHaveLength(1);
  expect(response.body.data[0].make).toBe("Honda");
});


test("should search vehicles by maximum price", async () => {
  await createVehicle({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 1000000,
  });

  await createVehicle({
    make: "Honda",
    model: "City",
    category: "Sedan",
    price: 2000000,
  });

  await createVehicle({
    make: "BMW",
    model: "X5",
    category: "SUV",
    price: 5000000,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .get("/api/vehicles/search?maxPrice=2000000")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  expect(response.body.data).toHaveLength(2);

  expect(response.body.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ make: "Toyota" }),
      expect.objectContaining({ make: "Honda" }),
    ])
  );
});

test("should search vehicles within a price range", async () => {
  await createVehicle({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 1000000,
  });

  await createVehicle({
    make: "Honda",
    model: "City",
    category: "Sedan",
    price: 2000000,
  });

  await createVehicle({
    make: "BMW",
    model: "X5",
    category: "SUV",
    price: 5000000,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .get("/api/vehicles/search?minPrice=1500000&maxPrice=3000000")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  expect(response.body.data).toHaveLength(1);
  expect(response.body.data[0].make).toBe("Honda");
});

test("should search vehicles using multiple filters", async () => {
  await createVehicle({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 4200000,
  });

  await createVehicle({
    make: "Toyota",
    model: "Glanza",
    category: "Hatchback",
    price: 900000,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .get("/api/vehicles/search?make=toy&category=suv")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  expect(response.body.data).toHaveLength(1);
  expect(response.body.data[0].model).toBe("Fortuner");
});

test("should return an empty array when no vehicles match", async () => {
  await createVehicle({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 4200000,
  });

  const token = createCustomerToken();

  const response = await request(app)
    .get("/api/vehicles/search?make=BMW")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data).toEqual([]);
});

test("should return all vehicles when no filters are provided", async () => {
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
    .get("/api/vehicles/search")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  expect(response.body.data).toHaveLength(2);
});

});
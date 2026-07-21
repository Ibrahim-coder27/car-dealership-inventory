const request = require("supertest");
const app = require("../../app");

describe("POST /api/auth/register", () => {
  test("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("User registered successfully");

    expect(response.body.data.name).toBe("John Doe");
    expect(response.body.data.email).toBe("john@example.com");
    expect(response.body.data.role).toBe("customer");

    expect(response.body.data).not.toHaveProperty("password");
  });
  
  test("should return 409 if email already exists", async () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  };

  // First registration
  await request(app)
    .post("/api/auth/register")
    .send(user);

  // Duplicate registration
  const response = await request(app)
    .post("/api/auth/register")
    .send(user);

  expect(response.statusCode).toBe(409);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Email already exists");
});
});
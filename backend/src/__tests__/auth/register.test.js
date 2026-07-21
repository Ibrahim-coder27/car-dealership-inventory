const request = require("supertest");
const app = require("../../app");

describe("POST /api/auth/register", () => {
  test("should register a new user successfully", async () => {
    const response = await request(app).post("/api/auth/register").send({
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
    await request(app).post("/api/auth/register").send(user);

    // Duplicate registration
    const response = await request(app).post("/api/auth/register").send(user);

    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email already exists");
  });

  const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

//password hashing test case
test("should hash password before saving the user", async () => {
  const user = {
    name: "Alice",
    email: "alice@example.com",
    password: "password123",
  };

  await request(app)
    .post("/api/auth/register")
    .send(user);

  const savedUser = await User.findOne({ email: user.email });

  expect(savedUser).not.toBeNull();

  // Password should not be stored as plain text
  expect(savedUser.password).not.toBe(user.password);

  // Hash should match the original password
  const isMatch = await bcrypt.compare(user.password, savedUser.password);

  expect(isMatch).toBe(true);
});
});

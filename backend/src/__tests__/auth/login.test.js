const request = require("supertest");
const app = require("../../app");

describe("POST /api/auth/login", () => {
  test("should login successfully with valid credentials", async () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    // Register user first
    await request(app)
      .post("/api/auth/register")
      .send(user);

    // Login
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login successful");

    expect(response.body.data).toHaveProperty("token");

    expect(response.body.data.user.name).toBe(user.name);
    expect(response.body.data.user.email).toBe(user.email);
    expect(response.body.data.user.role).toBe("customer");

    expect(response.body.data.user).not.toHaveProperty("password");
  });
});     
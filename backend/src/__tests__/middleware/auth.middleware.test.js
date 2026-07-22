const request = require("supertest");
const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");

const app = express();

app.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
  });
});

describe("Auth Middleware", () => {
  test("should return 401 when token is missing", async () => {
    const response = await request(app).get("/protected");

    expect(response.statusCode).toBe(401);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("Access token required");
  });

  const jwt = require("jsonwebtoken");

test("should allow access with a valid token", async () => {
  const token = jwt.sign(
    {
      id: "507f191e810c19729de860ea",
      role: "customer",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  const response = await request(app)
    .get("/protected")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
});


});
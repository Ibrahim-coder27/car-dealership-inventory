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
});
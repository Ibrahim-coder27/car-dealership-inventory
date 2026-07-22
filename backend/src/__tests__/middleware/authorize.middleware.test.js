const request = require("supertest");
const express = require("express");

const authorize = require("../../middleware/authorize.middleware");

const app = express();

// Fake authentication middleware for testing
app.use((req, res, next) => {
  req.user = {
    id: "123",
    role: "customer",
  };
  next();
});

app.get("/admin", authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});

describe("Authorization Middleware", () => {
  test("should return 403 when user does not have required role", async () => {
    const response = await request(app).get("/admin");

    expect(response.statusCode).toBe(403);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("Access denied");
  });

  test("should allow access when user has required role", async () => {
  const adminApp = express();

  adminApp.use((req, res, next) => {
    req.user = {
      id: "123",
      role: "admin",
    };
    next();
  });

  adminApp.get("/admin", authorize("admin"), (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  });

  const response = await request(adminApp).get("/admin");

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Welcome Admin");
});
});
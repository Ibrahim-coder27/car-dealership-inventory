const request = require("supertest");
const app = require("../../app");

describe("Get Vehicles", () => {
  test("should return all vehicles", async () => {
    const response = await request(app).get("/api/vehicles");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
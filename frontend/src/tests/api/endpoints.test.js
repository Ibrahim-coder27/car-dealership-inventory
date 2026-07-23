import { describe, expect, it } from "vitest";
import { API_ENDPOINTS } from "../../api/endpoints";

describe("API_ENDPOINTS", () => {
  it("contains authentication endpoints", () => {
    expect(API_ENDPOINTS.AUTH.LOGIN).toBe("/auth/login");
    expect(API_ENDPOINTS.AUTH.REGISTER).toBe("/auth/register");
  });

  it("contains vehicle endpoints", () => {
    expect(API_ENDPOINTS.VEHICLES.BASE).toBe("/vehicles");
    expect(API_ENDPOINTS.VEHICLES.SEARCH).toBe("/vehicles/search");
  });
});
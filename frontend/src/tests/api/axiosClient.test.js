import { describe, expect, it } from "vitest";
import axiosClient from "../../api/axiosClient";

describe("axiosClient", () => {
  it("uses the correct base URL", () => {
    expect(axiosClient.defaults.baseURL).toBe(
  import.meta.env.VITE_API_BASE_URL
);
  });

  it("uses JSON content type", () => {
    expect(
      axiosClient.defaults.headers["Content-Type"]
    ).toBe("application/json");
  });

  it("has a request timeout", () => {
    expect(axiosClient.defaults.timeout).toBe(10000);
  });
});
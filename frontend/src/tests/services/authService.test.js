import { describe, expect, it, vi, beforeEach } from "vitest";
import axiosClient from "../../api/axiosClient";
import authService from "../../services/authService";

vi.mock("../../api/axiosClient");

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs in a user", async () => {
    const mockResponse = {
      data: {
        success: true,
        message: "Login successful",
        data: {
          token: "jwt-token",
          user: {
            id: "1",
            name: "John",
            email: "john@example.com",
            role: "user",
          },
        },
      },
    };

    axiosClient.post.mockResolvedValue(mockResponse);

    const result = await authService.login({
      email: "john@example.com",
      password: "password123",
    });

    expect(axiosClient.post).toHaveBeenCalledWith(
      "/auth/login",
      {
        email: "john@example.com",
        password: "password123",
      }
    );

    expect(result).toEqual(mockResponse.data.data);
  });

  it("registers a new user", async () => {
    const mockResponse = {
      data: {
        success: true,
        message: "User registered successfully",
        data: {
          id: "1",
          name: "John",
          email: "john@example.com",
          role: "user",
        },
      },
    };

    axiosClient.post.mockResolvedValue(mockResponse);

    const result = await authService.register({
      name: "John",
      email: "john@example.com",
      password: "password123",
    });

    expect(axiosClient.post).toHaveBeenCalledWith(
      "/auth/register",
      {
        name: "John",
        email: "john@example.com",
        password: "password123",
      }
    );

    expect(result).toEqual(mockResponse.data.data);
  });
});
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import AppLayout from "../../layouts/AppLayout";

describe("AppLayout", () => {
  it("renders a shared layout", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <AppLayout>
            <h1>Dashboard</h1>
          </AppLayout>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
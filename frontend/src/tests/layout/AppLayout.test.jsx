import { render, screen } from "@testing-library/react";
import AppLayout from "../../layouts/AppLayout";

describe("AppLayout", () => {
  it("renders a shared layout", () => {
    render(
      <AppLayout>
        <h1>Dashboard</h1>
      </AppLayout>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
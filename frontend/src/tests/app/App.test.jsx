import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("Application Shell", () => {
  it("renders the application title and welcome message", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /car dealership inventory system/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/manage your vehicle inventory/i)
    ).toBeInTheDocument();
  });
});
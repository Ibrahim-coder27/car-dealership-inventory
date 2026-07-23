import { render, screen } from "@testing-library/react";
import LoginPage from "../../pages/LoginPage";

describe("LoginPage", () => {
  it("renders the login form", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("heading", {
        name: /login/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();
  });
});
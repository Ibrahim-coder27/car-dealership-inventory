import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../../pages/LoginPage";

describe("LoginPage", () => {
  it("renders the login form", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("heading", {
        name: /login/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(
      await screen.findByText(/email is required/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });
});
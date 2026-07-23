import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "../../pages/RegisterPage";

describe("RegisterPage", () => {
  it("renders the registration form", () => {
    render(<RegisterPage />);

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();

    render(<RegisterPage />);

    await user.click(
      screen.getByRole("button", {
        name: /register/i,
      })
    );

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
  await screen.findByText("Password is required")
).toBeInTheDocument();
    expect(
      await screen.findByText(/confirm password is required/i)
    ).toBeInTheDocument();
  });
});
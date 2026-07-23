import { render, screen } from "@testing-library/react";
import RegisterPage from "../../pages/RegisterPage";

describe("RegisterPage", () => {
  it("renders the registration form", () => {
    render(<RegisterPage />);

    expect(
      screen.getByRole("heading", {
        name: /register/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /register/i,
      })
    ).toBeInTheDocument();
  });
});
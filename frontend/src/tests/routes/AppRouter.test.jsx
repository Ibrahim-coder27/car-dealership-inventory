import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import AppRouter from "../../routes/AppRouter";
import { authStorage } from "../../storage/authStorage";

describe("App Router", () => {
  beforeEach(() => {
    authStorage.saveToken("mock-token");
    authStorage.saveUser({ name: "John Doe", role: "customer" });
  });

  afterEach(() => {
    authStorage.clearSession();
  });

  it("renders the home page on '/'", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(
      screen.getByRole("heading", {
        name: /home/i,
      })
    ).toBeInTheDocument();
  });
});
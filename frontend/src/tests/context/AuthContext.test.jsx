import { render, screen } from "@testing-library/react";
import { useAuth, AuthProvider } from "../../context/AuthContext";

function TestComponent() {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <p>{user ? user.name : "No User"}</p>
      <p>{isAuthenticated ? "Authenticated" : "Guest"}</p>
    </>
  );
}

describe("AuthContext", () => {
  it("provides the default authentication state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText("No User")).toBeInTheDocument();
    expect(screen.getByText("Guest")).toBeInTheDocument();
  });
});
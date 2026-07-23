import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "../../routes/AppRouter";

describe("App Router", () => {
  it("renders the home page on '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /home/i,
      })
    ).toBeInTheDocument();
  });
});
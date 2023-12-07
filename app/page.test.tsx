import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

describe("Home", () => {
  it("renders content", () => {
    render(<Home />);

    const test = screen.getByText("Welcome page");

    expect(test).toBeInTheDocument();
  });
});

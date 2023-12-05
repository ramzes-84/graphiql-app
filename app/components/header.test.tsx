import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./header";

describe("Header", () => {
  it("renders content", () => {
    render(<Header />);

    const headerText = screen.getByText("Header");

    expect(headerText).toBeInTheDocument();
  });
});

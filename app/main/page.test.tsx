import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("renders content", () => {
    render(<Page />);

    const text = screen.getByText("Main page");

    expect(text).toBeInTheDocument();
  });
});

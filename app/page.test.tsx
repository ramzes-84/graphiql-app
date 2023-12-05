import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const test = screen.getByText(
      "Instantly deploy your Next.js site to a shareable URL with Vercel."
    );

    expect(test).toBeInTheDocument();
  });
});

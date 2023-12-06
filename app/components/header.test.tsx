import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./header";

describe("Header", () => {
  it("renders content", () => {
    render(<Header />);

    const mainIcon = screen.getByTitle("welcome page");
    const exitIcon = screen.getByTitle("sign out");

    expect(mainIcon).toBeInTheDocument();
    expect(exitIcon).toBeInTheDocument();
  });
  it("changes styles if to have scroll", async () => {
    render(<Header />);
    const scrollEvent = new Event("scroll");
    const header = screen.getByTestId("header-test");

    await waitFor(() => {
      window.scrollY = 10;
      window.dispatchEvent(scrollEvent);
    });

    expect(header).toHaveClass(
      "bg-purple-200 py-2 fixed top-0 w-full transition-colors"
    );

    await waitFor(() => {
      window.scrollY = 0;
      window.dispatchEvent(scrollEvent);
    });

    expect(header).toHaveClass("bg-header py-5 transition-colors");
  });
});

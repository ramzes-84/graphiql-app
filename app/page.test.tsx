import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

describe("Home component:", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders content", () => {
    const test = screen.getByText("Welcome Page");

    expect(test).toBeInTheDocument();
  });

  it("should render with correct props", () => {
    const welcomeMessage = screen.getByText("Welcome Page");

    expect(welcomeMessage).toBeInTheDocument();
  });

  it("should open popup", () => {
    const person = screen.getByAltText("Lyubov Agulova");
    act(() => {
      fireEvent.click(person);
    });
    const text = screen.getByText("Contributions to GraphiQL", {
      exact: false,
    });

    expect(text).toBeInTheDocument();
  });

  it("should close popup", async () => {
    const person = screen.getByAltText("Lyubov Agulova");
    act(() => {
      fireEvent.click(person);
    });
    const exit = screen.getByTitle("Exit");
    act(() => {
      fireEvent.click(exit);
    });
    expect(exit).not.toBeInTheDocument();
  });
});

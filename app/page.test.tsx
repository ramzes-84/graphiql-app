import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

describe("Home component:", () => {
  it("renders content", () => {
    render(<Home />);

    const test = screen.getByText("Welcome Page");

    expect(test).toBeInTheDocument();
  });
});

describe("Home component:", () => {
  it("should render with correct props", () => {
    const { getByText } = render(<Home />);

    expect(getByText("Welcome Page")).toBeInTheDocument();
  });
});

describe("Home component:", () => {
  it("should open popup", () => {
    render(<Home />);

    const person = screen.getByAltText("Lyubov Agulova");
    fireEvent.click(person);
    const text = screen.getByText(
      "Contributions to eCommerce Application project:"
    );

    expect(text).toBeInTheDocument();
  });
});

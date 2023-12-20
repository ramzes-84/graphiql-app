import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

jest.mock("next-auth/react", () => ({
  useSession: () =>
    jest
      .fn()
      .mockReturnValueOnce({ status: "unauthenticated" })
      .mockReturnValue({ status: "authenticated" }),
  signIn: jest.fn(),
}));

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
      "Contributions to GraphiQL Application project:"
    );

    expect(text).toBeInTheDocument();
  });
  it("should close popup", async () => {
    render(<Home />);

    const person = screen.getByAltText("Lyubov Agulova");
    fireEvent.click(person);
    const exit = screen.getByTitle("Exit");
    await waitFor(() => {
      fireEvent.click(exit);
      expect(exit).not.toBeInTheDocument();
    });
  });
});

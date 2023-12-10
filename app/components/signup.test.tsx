import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GlobalProvider } from "../context/context-provider";
import { Signup } from "./signup";

describe("Sign up form", () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <Signup />
      </GlobalProvider>
    );
  });
  it("should trender component", () => {
    const signIn = screen.getAllByText("Sign Up");
    const password = screen.getByText("Password");

    expect(signIn).toHaveLength(2);
    expect(password).toBeInTheDocument();
  });
});

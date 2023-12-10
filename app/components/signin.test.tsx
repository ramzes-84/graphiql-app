import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GlobalProvider } from "../context/context-provider";
import { Signin } from "./signin";

describe("Sign in form", () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <Signin />
      </GlobalProvider>
    );
  });
  it("should trender component", () => {
    const btn = screen.getByText("Sign In");
    const email = screen.getByText("Email address");

    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    expect(email).toBeInTheDocument();
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { SessionProvider } from "next-auth/react";

const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: () => mockRedirect,
  navigation: jest.fn(),
}));

export const mockSession = {
  data: null,
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  status: "unauthenticated",
};

beforeEach(() => {
  fetchMock.mockResponse(JSON.stringify(mockSession));

  jest.mock("next-auth/react", () => ({
    useSession: () => jest.fn().mockReturnValueOnce(mockSession),
    signIn: jest.fn(),
  }));
});

describe("Home component:", () => {
  it("renders content", async () => {
    render(
      <SessionProvider>
        <Home />
      </SessionProvider>
    );
    await waitFor(() => {
      const test = screen.getByText("Welcome Page");

      expect(test).toBeInTheDocument();
    });
  });
});

describe("Home component:", () => {
  it("should render with correct props", () => {
    render(
      <SessionProvider>
        <Home />
      </SessionProvider>
    );
    expect(screen.getByText("Welcome Page")).toBeInTheDocument();
  });
});

describe("Home component:", () => {
  it("should open popup", () => {
    render(
      <SessionProvider>
        <Home />
      </SessionProvider>
    );
    const person = screen.getByAltText("Lyubov Agulova");
    fireEvent.click(person);
    const text = screen.getByText(
      "Contributions to GraphiQL Application project:"
    );

    expect(text).toBeInTheDocument();
  });
  it("should close popup", async () => {
    render(
      <SessionProvider>
        <Home />
      </SessionProvider>
    );
    const person = screen.getByAltText("Lyubov Agulova");
    fireEvent.click(person);
    const exit = screen.getByTitle("Exit");
    await waitFor(() => {
      fireEvent.click(exit);
      expect(exit).not.toBeInTheDocument();
    });
  });
});

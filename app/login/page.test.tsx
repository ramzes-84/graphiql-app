import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import SessionProvider from "../SessionProvider";
import fetchMock from "jest-fetch-mock";

const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: () => mockRedirect,
  navigation: jest.fn(),
}));

export const mockSession = {
  data: {
    user: {
      name: "John Doe",
    },
  },
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  status: "authenticated",
};

beforeEach(() => {
  fetchMock.mockResponse(JSON.stringify(mockSession));

  jest.mock("next-auth/react", () => ({
    useSession: () => jest.fn().mockReturnValueOnce(mockSession),
    signIn: jest.fn(),
  }));
});

describe("Page", () => {
  it("renders content", async () => {
    render(
      <SessionProvider>
        <Page />
      </SessionProvider>
    );

    await waitFor(() => {
      const title = screen.getByText("Sign in to your account");
      const text = screen.getByText("Do not have an account?");

      expect(text).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });
  });
  it("switches from signin to signup form", async () => {
    render(
      <SessionProvider>
        <Page />
      </SessionProvider>
    );
    const title = screen.getByText("Sign in to your account");
    const btn = screen.getByText("Sign Up");
    fireEvent.click(btn);

    await waitFor(() => {
      const text2 = screen.getByText("Already have an account?");

      expect(text2).toBeInTheDocument();
      expect(title).not.toBeInTheDocument();
    });
  });
});

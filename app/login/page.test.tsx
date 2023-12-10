import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
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
      <SessionProvider session={mockSession}>
        <Page />
      </SessionProvider>
    );

    await waitFor(() => {
      const text = screen.getByText("Sign In");

      expect(text).toBeInTheDocument();
    });
  });
});

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import { SessionProvider } from "next-auth/react";

const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: () => mockRedirect,
}));

const mockSession = {
  user: {
    name: "John Doe",
    email: "111@test.com",
  },
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
};

beforeEach(() => {
  fetchMock.mockResponse(JSON.stringify(mockSession));
});

describe("Page", () => {
  it("renders content", async () => {
    render(
      <SessionProvider session={null}>
        <Page />
      </SessionProvider>
    );
    const text = screen.getByText("Main Page");
    const btn = screen.getByText("Sign Out");
    fireEvent.click(btn);
    await waitFor(() => {
      expect(text).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
    });
  });
});

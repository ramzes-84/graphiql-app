import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import { SessionProvider } from "../SessionProvider";

jest.mock("../components/editor/editor", () => {
  return jest.fn().mockReturnValue(<div>Test Editor</div>);
});

export const mockSession = {
  user: {
    token_expiry: "",
  },
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
};

beforeEach(() => {
  fetchMock.mockResponse(JSON.stringify(mockSession));

  jest.mock("next-auth/react", () => ({
    useSession: () =>
      jest.fn().mockReturnValueOnce({ mockSession, status: "authenticated" }),
    signIn: jest.fn(),
    signOut: jest.fn(),
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
      const text = screen.getByText("Main Page");
      const editorComponent = screen.getByText("Test Editor");

      expect(text).toBeInTheDocument();
      expect(editorComponent).toBeInTheDocument();
    });
  });
});

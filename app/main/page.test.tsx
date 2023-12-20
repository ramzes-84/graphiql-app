import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

jest.mock("../components/editor/editor", () => {
  return jest.fn().mockReturnValue(<div>Test Editor</div>);
});

const mockSignOut = jest.fn();

export const mockSession = {
  user: {
    token_expiry: "2022-12-20T16:33:26.618Z",
  },
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
};

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => {
    return { data: mockSession, status: "authenticated" };
  }),
  signOut: () => mockSignOut,
}));

describe("Page", () => {
  it("renders content", async () => {
    render(<Page />);
    await waitFor(() => {
      const text = screen.getByText("Main Page");
      const editorComponent = screen.getByText("Test Editor");

      expect(text).toBeInTheDocument();
      expect(editorComponent).toBeInTheDocument();
    });
  });
});

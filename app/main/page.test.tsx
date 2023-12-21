import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Page from "./page";
import { Server } from "../context/contexts";

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
  beforeEach(() => {
    render(<Page />);
  });

  it("renders content", async () => {
    await waitFor(() => {
      const text = screen.getByText("Main Page");
      const editorComponent = screen.getByText("Test Editor");
      const serverChooserLabel = screen.getByText("Please choose the server:");
      const serverChooserDefaultSelector = screen.getByText("Countries");
      const serverChooserSelector = screen.getByText("Rick And Morty");

      expect(text).toBeInTheDocument();
      expect(editorComponent).toBeInTheDocument();
      expect(serverChooserLabel).toBeInTheDocument();
      expect(serverChooserDefaultSelector).toBeVisible();
      expect(serverChooserSelector).toBeInTheDocument();
    });
  });

  it("", () => {
    const serverChooserSelector: HTMLSelectElement =
      screen.getByText("Countries");
    expect(serverChooserSelector.value).toEqual(
      "https://countries.trevorblades.com/graphql"
    );

    act(() => {
      fireEvent.change(serverChooserSelector, {
        target: { value: Server.Rick },
      });
    });

    expect(serverChooserSelector.value).toEqual(
      "https://rickandmortyapi.com/graphql"
    );
  });
});

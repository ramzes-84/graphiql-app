import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import { formatCode } from "../utils/formateCode";
import { sendRequest } from "@/app/utils/request";

jest.mock("../utils/formateCode");
jest.mock("../utils/request");

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
  it("should format code on correct button click", () => {
    const correctBtn = screen.getByTitle("Prettify query");

    expect(correctBtn).toBeInTheDocument();
    fireEvent.click(correctBtn);
    expect(formatCode).toHaveBeenCalled();
  });
  it("should call function", () => {
    const makeQueryBtn = screen.getByTitle("Execute query");
    expect(makeQueryBtn).toBeInTheDocument();

    fireEvent.click(makeQueryBtn);
    expect(sendRequest).toHaveBeenCalled();
  });
});

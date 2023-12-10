import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import SessionProvider from "../SessionProvider";

const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: () => mockRedirect,
}));

describe("Page", () => {
  it("renders content", async () => {
    render(
      <SessionProvider>
        <Page />
      </SessionProvider>
    );

    await waitFor(() => {
      const text = screen.getByText("Main Page");
      const btn = screen.getByText("Sign Out");

      expect(text).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
    });
  });
});

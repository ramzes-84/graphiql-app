import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import { SessionProvider } from "../SessionProvider";
import fetchMock from "jest-fetch-mock";

const mockResponse = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    assign: mockResponse,
  },
  writable: true,
});

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
      expect(title).toHaveTextContent("Registration");
    });
  });
  it("Validate sign in form", async () => {
    render(
      <SessionProvider>
        <Page />
      </SessionProvider>
    );
    const email = screen.getByRole("textbox", { name: /email/i });
    const password = screen.getByRole("textbox", { name: /password/i });
    const btn = screen.getByText("Sign In");
    fireEvent.change(email, { target: { value: "111@test.com" } });
    fireEvent.change(password, { target: { value: "Pass111)" } });
    await waitFor(() => {
      expect(btn).not.toBeDisabled();
      fireEvent.click(btn);
    });
  });
  it("Validate sign up form", async () => {
    render(
      <SessionProvider>
        <Page />
      </SessionProvider>
    );
    const btn = screen.getByText("Sign Up");
    fireEvent.click(btn);

    await waitFor(async () => {
      const email = screen.getByRole("textbox", { name: /email/i });
      const password = screen.getByRole("textbox", { name: /password/i });
      const submit = screen.getByText("Sign Up");
      fireEvent.change(email, { target: { value: "fail" } });
      fireEvent.change(password, { target: { value: "Pass111)" } });
      expect(submit).toBeDisabled();
      expect(screen.getByText("Incorrect email address")).toBeInTheDocument();
    });
  });
});

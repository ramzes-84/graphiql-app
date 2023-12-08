import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./header";
import RootLayout from "../layout";

describe("Header", () => {
  jest.mock("./footer", () => {
    return {
      Footer: jest.fn().mockReturnValue(<div>Test Footer</div>),
    };
  });
  // eslint-disable-next-line no-console
  console.error = jest.fn();

  beforeEach(() => {
    render(
      <RootLayout>
        <div>Children</div>
      </RootLayout>
    );
  });
  it("should take the default lang from Context", () => {
    const enBtn = screen.getByText("EN");
    const ruBtn = screen.getByText("RU");

    expect((enBtn as HTMLButtonElement).disabled).toEqual(true);
    expect((ruBtn as HTMLButtonElement).disabled).toEqual(false);
  });

  it("should change lang on btns click", () => {
    const ruBtn = screen.getByText("RU");
    act(() => {
      fireEvent.click(ruBtn);
    });
    const translatedRuBtn = screen.getByText("РУС");

    expect((translatedRuBtn as HTMLButtonElement).disabled).toEqual(true);
  });
});

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders content", () => {
    const langEn = screen.getByText("EN");
    const langRu = screen.getByText("RU");
    const mainIcon = screen.getByTitle("welcome page");
    const exitIcon = screen.getByTitle("sign out");
    const signInIcon = screen.getByTitle("sign in");

    expect(langEn).toBeInTheDocument();
    expect(langRu).toBeInTheDocument();
    expect(mainIcon).toBeInTheDocument();
    expect(exitIcon).toBeInTheDocument();
    expect(signInIcon).toBeInTheDocument();
  });
  it("changes styles if to have scroll", async () => {
    const scrollEvent = new Event("scroll");
    const header = screen.getByRole("banner");

    await waitFor(() => {
      window.scrollY = 10;
      window.dispatchEvent(scrollEvent);
    });

    expect(header).toHaveClass(
      "bg-purple-200 py-2 fixed top-0 w-full transition-colors"
    );

    await waitFor(() => {
      window.scrollY = 0;
      window.dispatchEvent(scrollEvent);
    });

    expect(header).toHaveClass("bg-header py-5 transition-colors");
  });
});

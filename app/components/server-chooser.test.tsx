import { act, fireEvent, render, screen } from "@testing-library/react";
import { ServerChooser } from "./server-chooser";
import { Server } from "../context/contexts";
import { GlobalProvider } from "../context/context-provider";

beforeEach(() => {
  render(
    <GlobalProvider>
      <ServerChooser />
    </GlobalProvider>
  );
});

describe("Server chooser component", () => {
  it("should render inputs", () => {
    expect(screen.getByText("Please choose the server:")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should change server endpoint in input", () => {
    const serverChooserSelector: HTMLSelectElement =
      screen.getByText("Countries");
    const serverChooserInput: HTMLInputElement = screen.getByRole("textbox");

    expect(serverChooserSelector.value).toEqual(
      "https://countries.trevorblades.com/graphql"
    );
    expect(serverChooserInput.value).toEqual(
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

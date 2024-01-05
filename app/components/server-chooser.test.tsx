import { act, fireEvent, render, screen } from "@testing-library/react";
import { ServerChooser } from "./server-chooser";
import { Server } from "../context/contexts";
import { getSchema } from "../utils/request";

jest.mock("../utils/request");

describe("Server chooser component", () => {
  it("should render inputs", () => {
    const { getByText, getByRole } = render(<ServerChooser />);
    expect(getByText("Please choose the server:")).toBeInTheDocument();
    expect(getByRole("combobox")).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getSchema).toHaveBeenCalled();
  });

  it("shoud change endpoint value & request schema", () => {
    render(<ServerChooser />);

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

    expect(getSchema).toHaveBeenCalled();
    expect(serverChooserSelector.value).toEqual(
      "https://rickandmortyapi.com/graphql"
    );
  });
});

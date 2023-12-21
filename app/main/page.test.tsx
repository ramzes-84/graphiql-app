import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Page from "./page";
import { Server } from "../components/server-chooser";
// import React from "react";

jest.mock("../components/editor/editor", () => {
  return jest.fn().mockReturnValue(<div>Test Editor</div>);
});
// jest.mock("../components/viewer/viewer", () => {
//   return jest.fn().mockReturnValue(<div>Test Viewer</div>);
// });
// jest.mock("../utils/useDictHook", () => {
//   return {
//     useDict: jest.fn().mockReturnValue({ mainPage: "Test main page" }),
//   };
// });

// const mockedSetEndpoint = jest.fn();

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useContext: jest.fn().mockReturnValue({
//     endpoint: "http://test.test",
//     setEndpoint: () => mockedSetEndpoint(),
//   }),
//   createContext: jest.fn().mockReturnValue({
//     endpoint: Server.Countries,
//     setEndpoint: () => mockedSetEndpoint(),
//   }),
// }));

describe("Page", () => {
  beforeEach(() => {
    render(<Page />);
  });

  it("renders content", () => {
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
    // expect(mockedSetEndpoint).toHaveBeenCalled();
  });
});

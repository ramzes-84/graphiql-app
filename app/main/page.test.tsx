import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

jest.mock("../components/editor/editor", () => {
  return jest.fn().mockReturnValue(<div>Test Editor</div>);
});

describe("Page", () => {
  it("renders content", () => {
    render(<Page />);

    const text = screen.getByText("Main Page");
    const editorComponent = screen.getByText("Test Editor");

    expect(text).toBeInTheDocument();
    expect(editorComponent).toBeInTheDocument();
  });
});

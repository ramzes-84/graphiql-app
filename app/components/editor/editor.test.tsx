import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Editor from "./editor";

jest.mock("../../utils/formateCode");
import { formatCode } from "../../utils/formateCode";

describe("Editor", () => {
  it("should format code on correct button click", () => {
    render(<Editor />);
    const correctBtn = screen.getByTitle("formate code");
    fireEvent.click(correctBtn);
    expect(formatCode).toHaveBeenCalled();
  });
});

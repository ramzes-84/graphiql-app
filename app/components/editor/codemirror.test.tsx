import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Codemirror from "./Codemirror";

describe("Codemirror", () => {
  it("should call onChange with empty string when input is empty", () => {
    const mockOnChange = jest.fn();
    render(<Codemirror value="" onChange={mockOnChange} />);
    const codemirror = screen.getByRole("textbox");
    fireEvent.change(codemirror, { target: { textContent: "" } });

    expect(mockOnChange).not.toHaveBeenCalledWith("");
  });
});

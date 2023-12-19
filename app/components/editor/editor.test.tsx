import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Editor from "./editor";
import { formatCode } from "../../utils/formateCode";
import { sendRequest } from "@/app/utils/request";

jest.mock("../../utils/formateCode");
jest.mock("../../utils/request");
const mockCallback = jest.fn();

describe("Editor", () => {
  it("should format code on correct button click", () => {
    render(<Editor callback={mockCallback} />);

    const correctBtn = screen.getByTitle("Prettify query");

    expect(correctBtn).toBeInTheDocument();
    fireEvent.click(correctBtn);
    expect(formatCode).toHaveBeenCalled();
  });
  it("should call function", () => {
    render(<Editor callback={mockCallback} />);

    const makeQueryBtn = screen.getByTitle("Execute query");
    expect(makeQueryBtn).toBeInTheDocument();

    fireEvent.click(makeQueryBtn);
    expect(sendRequest).toHaveBeenCalled();
  });
});

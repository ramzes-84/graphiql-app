import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Editor from "./editor";
import { formatCode } from "../../utils/formateCode";
import { sendRequest } from "@/app/utils/request";

jest.mock("../../utils/formateCode");
jest.mock("../../utils/request");

describe("Editor", () => {
  it("should format code on correct button click", () => {
    render(<Editor />);

    const correctBtn = screen.getByTitle("Prettify query");

    expect(correctBtn).toBeInTheDocument();
    fireEvent.click(correctBtn);
    expect(formatCode).toHaveBeenCalled();
  });
  it("should call function", () => {
    render(<Editor />);

    const makeQueryBtn = screen.getByTitle("Execute query");
    expect(makeQueryBtn).toBeInTheDocument();

    fireEvent.click(makeQueryBtn);
    expect(sendRequest).toHaveBeenCalled();
  });
  it("shows variables panel", async () => {
    render(<Editor />);

    const btn = screen.getByText("Variables");
    fireEvent.click(btn);
    await waitFor(() => {
      const variablesEditor = screen.getByTitle("variables");
      expect(variablesEditor).toBeInTheDocument();
    });
  });
  it("shows headers panel", async () => {
    render(<Editor />);

    const btn = screen.getByText("Headers");
    fireEvent.click(btn);
    await waitFor(() => {
      const headers = screen.getByText("headers");
      expect(headers).toBeInTheDocument();
    });
  });
  it("hides panel on arrow down", async () => {
    render(<Editor />);

    const btn = screen.getByText("Headers");
    fireEvent.click(btn);

    const headers = screen.getByText("headers");
    expect(headers).toBeInTheDocument();
    await waitFor(() => {
      const arrow = screen.getByTitle("arrow-down");
      fireEvent.click(arrow);
      expect(headers).not.toBeInTheDocument();
    });
  });
});

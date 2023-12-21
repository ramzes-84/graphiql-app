import { render } from "@testing-library/react";
import { ServerChooser } from "./server-chooser";
import { GlobalProvider } from "../context/context-provider";
import { SessionProvider } from "../SessionProvider";

jest.mock("react", () => ({
  useContext: jest.fn().mockReturnValue({ endpoint: "http://test.test" }),
  // useRef: jest.fn(),
}));

describe("Server chooser component", () => {
  it("should render inputs", () => {
    const { getByText } = render(
      <SessionProvider>
        <GlobalProvider>
          <ServerChooser />
        </GlobalProvider>
      </SessionProvider>
    );

    expect(getByText("Please choose the server:")).toBeInTheDocument();
  });
});

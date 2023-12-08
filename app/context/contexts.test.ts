import { useDict } from "../utils/useDictHook";

jest.mock("react", () => {
  return {
    useContext: jest
      .fn()
      .mockReturnValueOnce({ lang: "en" })
      .mockReturnValueOnce({ lang: "fr" }),
    createContext: jest.fn(),
  };
});

describe("Custom useDict hook", () => {
  it("should return dictionary", () => {
    const dict = useDict();
    expect(dict).toBeTruthy();
  });

  it("should throw error when there is no any dict for language", () => {
    let errorMsg = "";
    try {
      useDict();
    } catch (error) {
      errorMsg = (error as Error).message;
    }
    expect(errorMsg).toEqual("There is no dictionary for such a language");
  });
});

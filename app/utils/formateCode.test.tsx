import { formatCode } from "./formateCode";

describe("formatCode", () => {
  it("should format the code correctly", () => {
    const unformattedCode =
      "#testcode\n   \nquery{pokemons(first:2){name code{name}}}";
    const expectedFormattedCode = `#testcode\n   \nquery {\n pokemons(first: 2) {\n  name\n  code {\n   name\n  }\n }\n}`;
    const formattedCode = formatCode(unformattedCode);
    expect(formattedCode).toEqual(expectedFormattedCode);
  });
});

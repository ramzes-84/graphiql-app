export const formatCode = (text: string, indent = 0): string | undefined => {
  if (!text || text.trim() === "") return;

  const lines = text.split("\n");

  let result = "";
  let openBracketsCount = 0;

  for (const line of lines) {
    if (line.trim() === "" || line.trim().startsWith("#")) {
      result += line + "\n";
    } else {
      const trimmedLine = line.replace(/\s+/g, " ");
      for (let i = 0; i < trimmedLine.length; i += 1) {
        const char = trimmedLine[i];
        if (char === "{") {
          result += " {\n" + " ".repeat(indent + 1);
          indent += 1;
          openBracketsCount += 1;
        } else if (char === "}") {
          indent -= 1;
          openBracketsCount -= 1;
          result += "\n" + " ".repeat(indent) + "}";

          if (
            i < trimmedLine.length - 1 &&
            trimmedLine[i + 1].match(/[a-zA-Z]/)
          ) {
            result += "\n" + " ".repeat(indent);
          }
        } else if (char === ":") {
          result += ": ";
        } else if (char === " ") {
          result += "\n" + " ".repeat(indent);
        } else {
          result += char;
        }
      }
    }
  }

  if (openBracketsCount > 0) {
    result += "\n" + " ".repeat(indent - 1) + "}".repeat(openBracketsCount);
  }

  return result;
};

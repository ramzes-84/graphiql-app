export const formatCode = (text: string) => {
  let result = "";
  result = text.replace(/\{/g, " {\n ");
  result = result.replace(/\s*;\s*/g, "; ");
  result = result.replace(/,\s*/g, ", ");
  result = result.replace(/:\s*/g, ": ");
  result = result.replace(/\s*\)\s*/g, ") ");
  result = result.replace(/\s*}\s*/g, "\n}");

  const lines = result.split("\n");
  let stringLevel = 0;
  let formattedCode = "";

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].includes("{")) {
      stringLevel += 1;
    }
    for (let j = 0; j < stringLevel; j += 1) {
      formattedCode += " ";
    }
    formattedCode += lines[i] + "\n";
    if (lines[i].includes("}")) {
      stringLevel -= 1;
    }
  }

  return formattedCode;
};

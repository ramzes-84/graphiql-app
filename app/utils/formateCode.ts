export const formatCode = (text: string) => {
  const arrStrings = text.split("\n");

  if (arrStrings.length === 0) return;

  const newArr: string[] = [];
  arrStrings.forEach((item) => {
    if (item === "" || item.trim().startsWith("#")) {
      newArr.push(item);
    } else {
      let result = item.trim();
      result = result.replace(/\{/g, " {\n");
      result = result.replace(/,\s*/g, ", ");
      result = result.replace(/:\s*/g, ": ");
      result = result.replace(/\s*\)\s*/g, ") ");
      result = result.replace(/\s*}\s*/g, "\n}");
      newArr.push(result);
    }
  });

  let stringLevel = 0;
  let formattedCode = "";

  for (let i = 0; i < newArr.length; i += 1) {
    if (newArr[i] === "" || newArr[i].trim().startsWith("#")) {
      formattedCode += newArr[i] + "\n";
    } else {
      if (newArr[i].includes("{")) {
        stringLevel += 1;
      }
      for (let j = 0; j < stringLevel; j += 1) {
        formattedCode += " ";
      }
      formattedCode += newArr[i] + "\n";
      if (newArr[i].includes("}")) {
        stringLevel -= 1;
      }
    }
  }
  return formattedCode;
};

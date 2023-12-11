import * as fs from "fs";
import { isNumeric } from "../../utils.ts";

const isASpecialCharacter = (char: string): boolean =>
  char !== "." && !isNumeric(char);

const shouldCheckForPreviousChar = (currentNumber: string, char: number) =>
  currentNumber === "" && char > 0;

const input = fs.readFileSync("day3/input").toString();
const inputLines = input.split("\n");
let result: number = 0;
for (let line = 0; line < inputLines.length; line++) {
  const chars = inputLines[line].split("");
  let currentNumber = "";
  let shouldCount = false;
  for (let char = 0; char < inputLines[line].length; char++) {
    const curentChar = chars[char];
    if (isNumeric(curentChar)) {
      if (shouldCheckForPreviousChar(currentNumber, char)) {
        if (isASpecialCharacter(chars[char - 1])) shouldCount = true;
        try {
          if (isASpecialCharacter(inputLines[line - 1].split("")[char - 1]))
            shouldCount = true;
        } catch {}
        try {
          if (isASpecialCharacter(inputLines[line + 1].split("")[char - 1]))
            shouldCount = true;
        } catch {}
      }

      currentNumber = currentNumber + curentChar;

      try {
        if (isASpecialCharacter(inputLines[line - 1].split("")[char]))
          shouldCount = true;
      } catch {}
      try {
        if (isASpecialCharacter(inputLines[line + 1].split("")[char]))
          shouldCount = true;
      } catch {}
    }

    if (!isNumeric(curentChar) && currentNumber !== "") {
      if (isASpecialCharacter(curentChar)) {
        shouldCount = true;
      }
      try {
        if (isASpecialCharacter(inputLines[line - 1].split("")[char]))
          shouldCount = true;
      } catch {}
      try {
        if (isASpecialCharacter(inputLines[line + 1].split("")[char]))
          shouldCount = true;
      } catch {}

      if (shouldCount) {
        console.log(currentNumber);
        result += Number(currentNumber);
      }
      currentNumber = "";
      shouldCount = false;
    }

    if (
      isNumeric(curentChar) &&
      char === chars.length - 1 &&
      currentNumber !== ""
    ) {
      if (shouldCount) {
        console.log(currentNumber);
        result += Number(currentNumber);
      }
    }
  }
}

console.log(result);

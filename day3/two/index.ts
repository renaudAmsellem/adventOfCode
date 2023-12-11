import * as fs from "fs";
import { isNumeric } from "../../utils.js";

const isASpecialCharacter = (char: string): boolean =>
  char !== "." && !isNumeric(char);

const shouldCheckForPreviousChar = (currentNumber: string, char: number) =>
  currentNumber === "" && char > 0;

const input = fs.readFileSync("day3/input").toString();
const inputLines = input.split("\n");
type PartNumber = {
  line: number;
  chars: Array<number>;
  number: number;
};

let partsNumber: Array<PartNumber> = [];
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
        const partNumber: PartNumber = {
          line,
          chars: [],
          number: Number(currentNumber),
        };
        for (let i = 0; i < currentNumber.length; i++) {
          partNumber.chars.push(char - i - 1);
        }
        partsNumber.push(partNumber);
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
        const partNumber: PartNumber = {
          line,
          chars: [],
          number: Number(currentNumber),
        };
        for (let i = 0; i < currentNumber.length; i++) {
          partNumber.chars.push(char - i);
        }
        partsNumber.push(partNumber);
      }
    }
  }
}

let result = 0;

for (let line = 0; line < inputLines.length; line++) {
  const chars = inputLines[line].split("");
  for (let char = 0; char < inputLines[line].length; char++) {
    if (chars[char] !== "*") continue;

    let partNumberBefore1: PartNumber | undefined;
    let partNumberBefore2: PartNumber | undefined;
    let partNumberBefore3: PartNumber | undefined;
    let partNumber1: PartNumber | undefined;
    let partNumber2: PartNumber | undefined;
    let partNumberAfter1: PartNumber | undefined;
    let partNumberAfter2: PartNumber | undefined;
    let partNumberAfter3: PartNumber | undefined;
    let countingPartNumbers: Array<PartNumber> = [];
    // find previous line
    try {
      partNumberBefore1 = partsNumber.find(
        (partNumber) =>
          partNumber.line === line - 1 && partNumber.chars.includes(char - 1)
      );
    } catch {}
    try {
      partNumberBefore2 = partsNumber.find(
        (partNumber) =>
          partNumber.line === line - 1 && partNumber.chars.includes(char)
      );
    } catch {}
    try {
      partNumberBefore3 = partsNumber.find(
        (partNumber) =>
          partNumber.line === line - 1 && partNumber.chars.includes(char + 1)
      );
    } catch {}

    if (partNumberBefore1) {
      countingPartNumbers.push(partNumberBefore1);
    }
    if (partNumberBefore2 && partNumberBefore2 !== partNumberBefore1) {
      countingPartNumbers.push(partNumberBefore2);
    }
    if (partNumberBefore3 && partNumberBefore3 !== partNumberBefore2) {
      countingPartNumbers.push(partNumberBefore3);
    }

    // find current line
    try {
      partNumber1 = partsNumber.find(
        (partNumber) =>
          partNumber.line === line && partNumber.chars.includes(char - 1)
      );
    } catch {}
    try {
      partNumber2 = partsNumber.find(
        (partNumber) =>
          partNumber.line === line && partNumber.chars.includes(char + 1)
      );
    } catch {}

    if (partNumber1) {
      countingPartNumbers.push(partNumber1);
    }
    if (partNumber2) {
      countingPartNumbers.push(partNumber2);
    }

    // find next line
    try {
      partNumberAfter1 = partsNumber.find(
        (partNumber) =>
          partNumber.line === line + 1 && partNumber.chars.includes(char - 1)
      );
    } catch {}
    try {
      partNumberAfter2 = partsNumber.find(
        (partNumber) =>
          partNumber.line === line + 1 && partNumber.chars.includes(char)
      );
    } catch {}
    try {
      partNumberAfter3 = partsNumber.find(
        (partNumber) =>
          partNumber.line === line + 1 && partNumber.chars.includes(char + 1)
      );
    } catch {}

    if (partNumberAfter1) {
      countingPartNumbers.push(partNumberAfter1);
    }
    if (partNumberAfter2 && partNumberAfter2 !== partNumberAfter1) {
      countingPartNumbers.push(partNumberAfter2);
    }
    if (partNumberAfter3 && partNumberAfter3 !== partNumberAfter2) {
      countingPartNumbers.push(partNumberAfter3);
    }

    if (countingPartNumbers.length === 2) {
      result += countingPartNumbers[0].number * countingPartNumbers[1].number;
    }
  }
}

console.log(result);

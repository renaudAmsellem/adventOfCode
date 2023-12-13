import * as fs from "fs";
import { invertArray } from "../../utils";

type Pattern = Array<string>;
type Patterns = Array<Pattern>;

let patterns: Patterns = fs
  .readFileSync("day13/input")
  .toString()
  .split("\n\n")
  .map((pattern) => pattern.split("\n"));

const findReflections = (pattern: Pattern): number => {
  for (let i = 1; i < pattern.length; i++) {
    if (pattern[i] === pattern[i - 1]) {
      if (i === 1) return i;

      for (let j = 1; j < pattern.length; j++) {
        if (i + j >= pattern.length || i - j - 1 < 0) return i;
        if (pattern[i + j] !== pattern[i - j - 1]) break;
      }
    }
  }

  return 0;
};

let totalHorizontalReflexions = 0;
let totalVerticalReflexions = 0;
for (let i = 0; i < patterns.length; i++) {
  totalHorizontalReflexions += findReflections(patterns[i]);
  const invertedPattern = invertArray(patterns[i]);
  totalVerticalReflexions += findReflections(invertedPattern);
}
const total = totalHorizontalReflexions * 100 + totalVerticalReflexions;
console.log("totalHorizontalReflexions - ", totalHorizontalReflexions);
console.log("totalVerticalReflexions - ", totalVerticalReflexions);
console.log("total : ", total);

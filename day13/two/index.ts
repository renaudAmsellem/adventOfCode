import * as fs from "fs";
import { invertArray } from "../../utils";

type Pattern = Array<string>;
type Patterns = Array<Pattern>;

let patterns: Patterns = fs
  .readFileSync("day13/input")
  .toString()
  .split("\n\n")
  .map((pattern) => pattern.split("\n"));

const hasSmudge = (pattern1: string, pattern2: string): boolean =>
  pattern1 !== pattern2;

const compareStrings = (pattern1: string, pattern2: string) => {
  let smudge = 0;
  for (let i = 0; i < pattern1.length; i++) {
    if (pattern1[i] !== pattern2[i]) smudge++;
  }
  return smudge <= 1;
};

const findReflections = (pattern: Pattern): number => {
  let smudge = 0;
  for (let i = 1; i < pattern.length; i++) {
    if (compareStrings(pattern[i], pattern[i - 1])) {
      if (hasSmudge(pattern[i], pattern[i - 1])) smudge++;
      if (i === 1 && smudge === 1) return i;

      for (let j = 1; j < pattern.length; j++) {
        if (i + j >= pattern.length || i - j - 1 < 0) {
          if (smudge === 1) return i;
          smudge = 0;
          break;
        }
        if (hasSmudge(pattern[i + j], pattern[i - j - 1])) smudge++;
        if (!compareStrings(pattern[i + j], pattern[i - j - 1])) {
          smudge = 0;
          break;
        }
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

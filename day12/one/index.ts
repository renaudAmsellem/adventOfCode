import * as fs from "fs";

const getTotalArrangements = (arrangements: Arrangments): number =>
  arrangements.reduce((a, b) => a + b, 0);

const checkIfPartIsGood = (
  part: Part,
  arrangements: Arrangments,
  totalArrangements: number
): boolean => {
  if (part.split("#").length !== totalArrangements + 1) return false;
  const allParts = part
    .split(/[\.\?]+/)
    .filter((p) => p !== "." && p !== "?")
    .filter((p) => p !== "");

  if (allParts.length !== arrangements.length) return false;
  for (let i = 0; i < allParts.length; i++) {
    if (allParts[i].length !== arrangements[i]) return false;
  }

  return true;
};

const brutforceCalculateArrangements = (
  part: Part,
  arrangements: Arrangments,
  changeFrom: number
): number => {
  let result = 0;
  const totalArrangements = getTotalArrangements(arrangements);
  if (changeFrom > part.length) return 0;
  for (let i = changeFrom; i < part.length; i++) {
    if (part[i] === "?") {
      const newPart = part.substring(0, i) + "#" + part.substring(i + 1);
      result += brutforceCalculateArrangements(newPart, arrangements, i);
      if (checkIfPartIsGood(newPart, arrangements, totalArrangements)) result++;
    }
  }

  return result;
};

type Part = string;
type Parts = Array<Part>;
type Arrangments = Array<number>;

let springRecord = fs.readFileSync("day12/input").toString().split("\n");
let parts: Parts = [];
let arrangements: Array<Arrangments> = [];
let totalArrangements: Array<number> = [];
for (let row = 0; row < springRecord.length; row++) {
  parts.push(springRecord[row].substring(0, springRecord[row].indexOf(" ")));
  const arrangement = springRecord[row]
    .substring(springRecord[row].indexOf(" "), springRecord[row].length)
    .split(",")
    .map(Number);
  arrangements.push(arrangement);
  totalArrangements.push(getTotalArrangements(arrangement));
}

const startTime = new Date().getTime();

let total = 0;
for (let i = 0; i < parts.length; i++) {
  const totalArrangements = getTotalArrangements(arrangements[i]);
  if (checkIfPartIsGood(parts[i], arrangements[i], totalArrangements)) total++;
  total += brutforceCalculateArrangements(parts[i], arrangements[i], 0);
  // console.log(`Part ${parts[i]} done : `, total);
}

const endTime = new Date().getTime();
console.log("time : ", endTime - startTime);
console.log(total);

//.??.?#??##???. 1,6
//[??,?#??##???] 1,6

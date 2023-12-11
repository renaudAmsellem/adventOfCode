import * as fs from "fs";

type Line = Array<number>;

const calculateNextLine = (line: Line): number => {
  const newLine: Line = [];
  for (let i = 1; i < line.length; i++) {
    newLine.push(line[i] - line[i - 1]);
  }
  if (newLine.every((value) => value === 0)) return line.splice(-1)[0];
  return line.splice(-1)[0] + calculateNextLine(newLine);
};

let histories = fs.readFileSync("day9/input").toString().split("\n");

let result: number = 0;
for (let i = 0; i < histories.length; i++) {
  const line = histories[i].split(" ").map(Number);
  const lineTotal = calculateNextLine(line);
  console.log(lineTotal);
  result += lineTotal;
}

console.log(result);

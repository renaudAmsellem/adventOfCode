import * as fs from "fs";

type Line = Array<number>;

const calculateNextLine = (line: Line): number => {
  const newLine: Line = [];
  console.log(line);
  for (let i = 1; i < line.length; i++) {
    newLine.push(line[i] - line[i - 1]);
  }
  console.log(newLine);
  if (newLine.every((value) => value === 0)) return line[0];
  return line[0] - calculateNextLine(newLine);
};

let histories = fs.readFileSync("day9/input2").toString().split("\n");

let result: number = 0;
for (let i = 0; i < histories.length; i++) {
  const line = histories[i].split(" ").map(Number);
  const lineTotal = calculateNextLine(line);
  result += lineTotal;
}

console.log(result);

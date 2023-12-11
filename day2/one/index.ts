import * as fs from "fs";

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const getGameNumber = (line: string): number =>
  Number(line.substring(5, line.indexOf(":")));

const getBallCount = (draw: string): number => {
  const count = draw.substring(0, draw.indexOf(" "));
  return Number(count);
};

const isPossible = (draws: Array<string>): boolean => {
  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    const ballCount = getBallCount(draw);
    if (draw.includes("red") && ballCount > maxRed) return false;
    if (draw.includes("blue") && ballCount > maxBlue) return false;
    if (draw.includes("green") && ballCount > maxGreen) return false;
  }
  return true;
};

const inputArray = fs.readFileSync("day2/input").toString().split("\n");
let result: number = 0;
for (let i = 0; i < inputArray.length; i++) {
  const gameNumber = getGameNumber(inputArray[i]);
  const draws = inputArray[i]
    .substring(inputArray[i].indexOf(":") + 2)
    .split(/, |; /);
  console.log(draws);
  if (isPossible(draws)) result += gameNumber;
}

console.log(result);

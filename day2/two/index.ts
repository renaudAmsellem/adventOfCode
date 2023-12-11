import * as fs from "fs";

const getBallCount = (draw: string): number => {
  const count = draw.substring(0, draw.indexOf(" "));
  return Number(count);
};

const drawPower = (draws: Array<string>): number => {
  let minRed = 0;
  let minBlue = 0;
  let minGreen = 0;
  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    const ballCount = getBallCount(draw);
    if (draw.includes("red") && ballCount > minRed) minRed = ballCount;
    if (draw.includes("blue") && ballCount > minBlue) minBlue = ballCount;
    if (draw.includes("green") && ballCount > minGreen) minGreen = ballCount;
  }
  return minRed * minBlue * minGreen;
};

const inputArray = fs.readFileSync("day2/input").toString().split("\n");
let result: number = 0;
for (let i = 0; i < inputArray.length; i++) {
  const draws = inputArray[i]
    .substring(inputArray[i].indexOf(":") + 2)
    .split(/, |; /);
  console.log(draws);
  result += drawPower(draws);
}

console.log(result);

import * as fs from "fs";

const isNumeric = (n: string) => !isNaN(parseFloat(n)) && isFinite(Number(n));

const twoNumbersToOne = (one: string, two: string): number =>
  Number(one.toString() + two.toString());

const calibrationToValue = (line: string) => {
  const chars = line.split("").filter((char) => isNumeric(char));
  console.log(chars);
  if (chars.length > 1) {
    return twoNumbersToOne(chars[0], chars[chars.length - 1]);
  }
  if (chars.length === 1) {
    return twoNumbersToOne(chars[0], chars[0]);
  }
  return 0;
};

const array = fs.readFileSync("day1/input").toString().split("\n");
const result = array.reduce(
  (acc, curentValue) => acc + calibrationToValue(curentValue),
  0
);
console.log(result);

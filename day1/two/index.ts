import fs from "fs";

const isNumeric = (n: any): boolean => !isNaN(parseFloat(n)) && isFinite(n);

const twoNumbersToOne = (one: number, two: number): number =>
  Number(one.toString() + two.toString());

const getNumbersFromLine = (line: string) => {
  const result: Array<number> = [];
  const chars = line.split("");
  for (let i = 0; i < chars.length; i++) {
    if (isNumeric(chars[i])) {
      result.push(Number(chars[i]));
    } else {
      if (line.substring(i).startsWith("zero")) {
        result.push(0);
      }
      if (line.substring(i).startsWith("one")) {
        result.push(1);
      }
      if (line.substring(i).startsWith("two")) {
        result.push(2);
      }
      if (line.substring(i).startsWith("three")) {
        result.push(3);
      }
      if (line.substring(i).startsWith("four")) {
        result.push(4);
      }
      if (line.substring(i).startsWith("five")) {
        result.push(5);
      }
      if (line.substring(i).startsWith("six")) {
        result.push(6);
      }
      if (line.substring(i).startsWith("seven")) {
        result.push(7);
      }
      if (line.substring(i).startsWith("eight")) {
        result.push(8);
      }
      if (line.substring(i).startsWith("nine")) {
        result.push(9);
      }
    }
  }
  return result;
};

const calibrationToValue = (line: string): number => {
  const numbers = getNumbersFromLine(line);
  console.log(numbers);
  if (numbers.length > 1) {
    return twoNumbersToOne(numbers[0], numbers[numbers.length - 1]);
  }
  if (numbers.length === 1) {
    return twoNumbersToOne(numbers[0], numbers[0]);
  }
  return 0;
};

const array = fs.readFileSync("day1/input").toString().split("\n");
const result = array.reduce(
  (acc, curentValue) => acc + calibrationToValue(curentValue),
  0
);
console.log(result);

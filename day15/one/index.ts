import * as fs from "fs";

let asciiCodes: Array<string> = fs
  .readFileSync("day15/input")
  .toString()
  .split(",");

const getAsciiCode = (char: string): number => char.charCodeAt(0);

const multiplyBy17 = (number: number): number => number * 17;

const modulo256 = (number: number): number => number % 256;

let total = 0;
for (let i = 0; i < asciiCodes.length; i++) {
  total += asciiCodes[i].split("").reduce((acc, asciiCode) => {
    const asciiValue = getAsciiCode(asciiCode);
    const sum = asciiValue + acc;
    const multiply = multiplyBy17(sum);
    const modulo = modulo256(multiply);
    return modulo;
  }, 0);
}
console.log(total);

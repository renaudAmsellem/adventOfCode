import * as fs from "fs";

type LeftRightInstructions = Array<string>;

let instructions = fs.readFileSync("day8/input").toString().split("\n");
const leftRightInstructions: LeftRightInstructions = instructions[0].split("");

type Directions = {
  [key: string]: {
    left: string;
    right: string;
  };
};

const directions: Directions = {};
for (let i = 2; i < instructions.length; i++) {
  const start = instructions[i].substring(0, 3);
  const left = instructions[i].substring(7, 10);
  const right = instructions[i].substring(12, 15);
  directions[start] = {
    left,
    right,
  };
}

console.log(leftRightInstructions);
let currentInstruction = "AAA";
let counter = 0;
while (currentInstruction !== "ZZZ") {
  for (let i = 0; i < leftRightInstructions.length; i++) {
    counter++;
    if (currentInstruction === "ZZZ") break;
    if (leftRightInstructions[i] === "L") {
      currentInstruction = directions[currentInstruction].left;
    }
    if (leftRightInstructions[i] === "R") {
      currentInstruction = directions[currentInstruction].right;
    }
  }
}
console.log(counter);

console.log("Résultat : ", 67 * 61 * 73 * 43 * 79 * 71 * 281);

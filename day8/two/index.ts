import * as fs from "fs";

type LeftRightInstructions = Array<string>;

let instructions = fs.readFileSync("day8/input").toString().split("\n");
const leftRightInstructions: LeftRightInstructions = instructions[0].split("");
console.log("leftRightInstructions count : ", leftRightInstructions.length);

type Directions = {
  [key: string]: {
    left: string;
    right: string;
  };
};
let allDirections: { [key: string]: Array<string> } = {};

const directions: Directions = {};
for (let i = 2; i < instructions.length; i++) {
  const start = instructions[i].substring(0, 3);
  const left = instructions[i].substring(7, 10);
  const right = instructions[i].substring(12, 15);
  directions[start] = {
    left,
    right,
  };
  allDirections[start] = [];
}

// console.log(currentInstructions);

for (let i = 0; i < leftRightInstructions.length; i++) {
  Object.entries(allDirections).map(([key, direction]) => {
    let newElement = "";
    if (direction.length === 0) {
      newElement = key;
    } else {
      newElement = direction.slice(-1)[0];
    }
    if (leftRightInstructions[i] === "L") {
      allDirections[key].push(directions[newElement].left);
    } else {
      allDirections[key].push(directions[newElement].right);
    }
  });
}

const allStartingDirections: Array<string> = [];
let newStartingDirection = "QVA";
let allPosForAAA: Array<string> = [];

while (!allStartingDirections.includes(newStartingDirection)) {
  allStartingDirections.push(newStartingDirection);
  newStartingDirection = allDirections[newStartingDirection].slice(-1)[0];
  allPosForAAA.push(...allDirections[newStartingDirection]);
}
allStartingDirections.push(newStartingDirection);

console.log("allStartingDirections : ", allStartingDirections);
console.log(allStartingDirections.length);

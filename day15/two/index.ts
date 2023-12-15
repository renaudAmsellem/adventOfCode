import * as fs from "fs";

let asciiCodes: Array<string> = fs
  .readFileSync("day15/input")
  .toString()
  .split(",");

const getAsciiCode = (char: string): number => char.charCodeAt(0);

const multiplyBy17 = (number: number): number => number * 17;

const modulo256 = (number: number): number => number % 256;

const getHashCode = (string: string): number =>
  string.split("").reduce((acc, asciiCode) => {
    const asciiValue = getAsciiCode(asciiCode);
    const sum = asciiValue + acc;
    const multiply = multiplyBy17(sum);
    const modulo = modulo256(multiply);
    return modulo;
  }, 0);

type Lens = [string, number];
type Box = Array<Lens>;

const findLabelIndex = (box: Box, label: string) =>
  box && box.findIndex((lens) => lens[0] === label);

const replaceLabel = (box: Box, lens: Lens) => {
  const oldLabelIndex = findLabelIndex(box, lens[0]);
  box[oldLabelIndex] = [box[oldLabelIndex][0], lens[1]];
  return box;
};

const deleteLabel = (box: Box, label: string) => {
  const oldLabelIndex = findLabelIndex(box, label);
  box.splice(oldLabelIndex, 1);
  return box;
};

const boxes: { [key: string]: Box } = {};
for (let i = 0; i < asciiCodes.length; i++) {
  const lens = asciiCodes[i].split(/([=-])/);
  const label = lens[0];
  const operation = lens[1];
  const value = Number(lens[2]);

  const hashCode = getHashCode(label);
  if (operation === "=") {
    const newLens: Lens = [label, value];
    if (findLabelIndex(boxes[hashCode], label) > -1) {
      replaceLabel(boxes[hashCode], newLens);
    } else {
      boxes[hashCode]
        ? boxes[hashCode].push(newLens)
        : (boxes[hashCode] = [newLens]);
    }
  }
  if (operation === "-") {
    const oldLabelIndex = findLabelIndex(boxes[hashCode], label);
    if (oldLabelIndex > -1)
      boxes[hashCode] = deleteLabel(boxes[hashCode], label);
  }
}

let total = 0;
for (const [key, box] of Object.entries(boxes)) {
  for (let i = 0; i < box.length; i++) {
    total += (Number(key) + 1) * (i + 1) * box[i][1];
  }
}
console.log(total);

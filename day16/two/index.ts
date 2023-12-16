import * as fs from "fs";

type Contraption = Array<string>;

type Position = [number, number];

type Direction = "U" | "D" | "R" | "L";
type Directions = Array<Direction>;
type VisitedSpaces = Array<[Position, Directions]>;

let visitedSpaces: VisitedSpaces = [];

let contraption: Contraption = fs
  .readFileSync("day16/input")
  .toString()
  .split("\n");

const maxLengthHorizontal = contraption[0].length - 1;
const maxLengthVertical = contraption.length - 1;

const callNewBeamWithNewPosition = (
  position: Position,
  direction: Direction
) => {
  if (direction === "U") position[1]--;
  if (direction === "D") position[1]++;
  if (direction === "L") position[0]--;
  if (direction === "R") position[0]++;
  moveBeam(JSON.parse(JSON.stringify(position)), direction);
};

const moveBeam = (newPosition: Position, newDirection: Direction) => {
  const position = JSON.parse(JSON.stringify(newPosition));
  const direction = JSON.parse(JSON.stringify(newDirection));
  if (
    !checkVisitedSpaceAndContinue(
      JSON.parse(JSON.stringify(position)),
      direction
    )
  )
    return;

  let mirrorType: string = "";
  try {
    mirrorType = contraption[position[1]][position[0]];
  } catch {}
  if (mirrorType === ".")
    return callNewBeamWithNewPosition(position, direction);

  if (mirrorType === "|") {
    if (["U", "D"].includes(direction))
      return callNewBeamWithNewPosition(position, direction);
    callNewBeamWithNewPosition(position, "U");
    callNewBeamWithNewPosition(position, "D");
  }

  if (mirrorType === "-") {
    if (["L", "R"].includes(direction))
      return callNewBeamWithNewPosition(position, direction);
    callNewBeamWithNewPosition(position, "L");
    callNewBeamWithNewPosition(position, "R");
  }

  if (mirrorType === "/") {
    if (direction === "U") return callNewBeamWithNewPosition(position, "R");
    if (direction === "R") return callNewBeamWithNewPosition(position, "U");
    if (direction === "L") return callNewBeamWithNewPosition(position, "D");
    return callNewBeamWithNewPosition(position, "L");
  }

  if (mirrorType === "\\") {
    if (direction === "U") return callNewBeamWithNewPosition(position, "L");
    if (direction === "L") return callNewBeamWithNewPosition(position, "U");
    if (direction === "R") return callNewBeamWithNewPosition(position, "D");
    return callNewBeamWithNewPosition(position, "R");
  }
};

const checkVisitedSpaceAndContinue = (
  position: Position,
  direction: Direction
): boolean => {
  if (position[0] < 0 || position[0] > maxLengthHorizontal) return false;
  if (position[1] < 0 || position[1] > maxLengthVertical) return false;

  const isSpaceVisited = visitedSpaces.find(
    (space) => space[0][0] === position[0] && space[0][1] === position[1]
  );

  if (!isSpaceVisited) {
    visitedSpaces.push([position, [direction]]);
    return true;
  }

  if (!isSpaceVisited[1].includes(direction)) {
    isSpaceVisited[1].push(direction);
    return true;
  }

  return false;
};

let maxEnergizedTiles = 0;
for (let i = 0; i < contraption[0].length; i++) {
  visitedSpaces = [];
  moveBeam([i, 0], "D");
  if (visitedSpaces.length > maxEnergizedTiles)
    maxEnergizedTiles = visitedSpaces.length;
}

for (let i = 0; i < contraption[0].length; i++) {
  visitedSpaces = [];
  moveBeam([contraption[0].length - 1, 0], "U");
  if (visitedSpaces.length > maxEnergizedTiles)
    maxEnergizedTiles = visitedSpaces.length;
}

for (let i = 0; i < contraption.length; i++) {
  visitedSpaces = [];
  moveBeam([0, i], "R");
  if (visitedSpaces.length > maxEnergizedTiles)
    maxEnergizedTiles = visitedSpaces.length;
}

for (let i = 0; i < contraption.length; i++) {
  visitedSpaces = [];
  moveBeam([0, contraption.length - 1], "L");
  if (visitedSpaces.length > maxEnergizedTiles)
    maxEnergizedTiles = visitedSpaces.length;
}

console.log(maxEnergizedTiles);

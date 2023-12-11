import * as fs from "fs";

type Position = [number, number];

type Direction = "E" | "W" | "N" | "S";

type PipeType = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

type Pipes = Array<Array<PipeType>>;

const findStartingPosition = (pipes: Pipes): Position => {
  for (let i = 0; i < pipes.length; i++) {
    for (let j = 0; j < pipes[i].length; j++) {
      if (pipes[i][j] === "S") return [i, j];
    }
  }
  return [0, 0];
};

const findNextPipe = (
  position: Position,
  pipeType: PipeType,
  direction: Direction
): [Position, Direction] => {
  switch (pipeType) {
    case "|": {
      if (direction === "N") return [[position[0] + 1, position[1]], "N"];
      if (direction === "S") return [[position[0] - 1, position[1]], "S"];
    }
    case "-": {
      if (direction === "E") return [[position[0], position[1] - 1], "E"];
      if (direction === "W") return [[position[0], position[1] + 1], "W"];
    }
    case "L": {
      if (direction === "N") return [[position[0], position[1] + 1], "W"];
      if (direction === "E") return [[position[0] - 1, position[1]], "S"];
    }
    case "J": {
      if (direction === "N") return [[position[0], position[1] - 1], "E"];
      if (direction === "W") return [[position[0] - 1, position[1]], "S"];
    }
    case "7": {
      if (direction === "S") return [[position[0], position[1] - 1], "E"];
      if (direction === "W") return [[position[0] + 1, position[1]], "N"];
    }
    case "F": {
      if (direction === "S") return [[position[0], position[1] + 1], "W"];
      if (direction === "E") return [[position[0] + 1, position[1]], "N"];
    }
  }

  throw new Error(`not good  ${position}, ${pipeType}, ${direction}`);
};

let pipes = fs
  .readFileSync("day10/input")
  .toString()
  .split("\n")
  .map((pipe) => pipe.split("")) as Pipes;

const startingPosition: Position = findStartingPosition(pipes);
let startingDirection: Direction = "W";

let currentPosition: Position = [startingPosition[0], startingPosition[1] + 1];
let currentDirection: Direction = startingDirection;
const allPositions: Array<Position> = [startingPosition, currentPosition];
while (
  currentPosition[0] !== startingPosition[0] ||
  currentPosition[1] !== startingPosition[1]
) {
  [currentPosition, currentDirection] = findNextPipe(
    currentPosition,
    pipes[currentPosition[0]][currentPosition[1]],
    currentDirection
  );
  allPositions.push(currentPosition);
}

console.log(allPositions);

const usedPipes: Pipes = pipes;
for (let i = 0; i < pipes.length; i++) {
  for (let j = 0; j < pipes[i].length; j++) {
    if (
      allPositions.find((position) => position[0] === i && position[1] === j)
    ) {
      usedPipes[i][j] = pipes[i][j];
    } else {
      usedPipes[i][j] = ".";
    }
  }
}

console.log(usedPipes);

const isInside = (traversed: number): boolean => traversed % 2 === 1;

let enclosedTiles: number = 0;

for (let i = 0; i < pipes.length; i++) {
  let traversed: number = 0;
  let lastTurnedPipe = "";
  for (let j = 0; j < pipes[i].length; j++) {
    let currentPipeType = pipes[i][j];
    if (currentPipeType === "|") traversed++;
    if (currentPipeType === "." && isInside(traversed)) {
      console.log("enclosed ++ ");
      console.log(i, j);
      enclosedTiles++;
    }
    if (currentPipeType === "-" || currentPipeType === "S") continue;
    if (["L", "J", "7", "F"].includes(currentPipeType)) {
      if (!lastTurnedPipe) {
        lastTurnedPipe = currentPipeType;
      } else {
        if (currentPipeType === "7" && lastTurnedPipe === "L") {
          traversed++;
        }
        if (currentPipeType === "J" && lastTurnedPipe === "F") {
          traversed++;
        }
        lastTurnedPipe = "";
      }
    }
  }
}

console.log(enclosedTiles);

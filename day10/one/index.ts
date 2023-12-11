import * as fs from "fs";

/*
| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
*/

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
  console.log("FINDNEXTPIPE");
  console.log("position : ", position);
  console.log("pipeType : ", pipeType);
  console.log("direction : ", direction);
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

console.log("test : ", pipes[92][43]);
console.log("test : ", pipes[93][47]);

console.log("starting S : ", startingPosition);
console.log(startingDirection);

let currentPosition: Position = [startingPosition[0], startingPosition[1] + 1];
let currentDirection: Direction = startingDirection;
let pipeTraversed = 1;
while (currentPosition !== startingPosition) {
  pipeTraversed++;
  [currentPosition, currentDirection] = findNextPipe(
    currentPosition,
    pipes[currentPosition[0]][currentPosition[1]],
    currentDirection
  );
  console.log(currentDirection);
  console.log(startingPosition);
  console.log(pipeTraversed);
}

console.log(pipeTraversed);

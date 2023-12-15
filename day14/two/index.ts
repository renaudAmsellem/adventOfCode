import * as fs from "fs";
import { invertArray } from "../../utils";

const space = "." as const;
const rock = "O" as const;
const cube = "#" as const;

const pointMirrorNorth = (mirror: Array<string>): Array<string> => {
  const northMirror = JSON.parse(JSON.stringify(mirror));
  let stoppingObstacle = -1;
  if (mirror[0] !== space) stoppingObstacle = 0;
  for (let i = 1; i < mirror.length; i++) {
    if (mirror[i] === rock && i > stoppingObstacle + 1) {
      northMirror[stoppingObstacle + 1] = mirror[i];
      northMirror[i] = space;
    } else {
      northMirror[i] = mirror[i];
    }
    if (mirror[i] === rock) stoppingObstacle++;
    if (mirror[i] === cube) stoppingObstacle = i;
  }

  return northMirror;
};

const pointMirrorEast = (mirror: Array<string>): Array<string> => {
  const eastMirror = JSON.parse(JSON.stringify(mirror));
  let stoppingObstacle = eastMirror.length;
  if (mirror[eastMirror.length - 1] !== space)
    stoppingObstacle = eastMirror.length - 1;
  for (let i = mirror.length - 2; i >= 0; i--) {
    if (mirror[i] === rock && i < stoppingObstacle - 1) {
      eastMirror[stoppingObstacle - 1] = mirror[i];
      eastMirror[i] = space;
    } else {
      eastMirror[i] = mirror[i];
    }
    if (mirror[i] === rock) stoppingObstacle--;
    if (mirror[i] === cube) stoppingObstacle = i;
  }

  return eastMirror;
};

const calculateLoad = (mirror: Array<string>): number => {
  let load = 0;
  for (let i = 0; i < mirror.length; i++) {
    if (mirror[i] !== rock) continue;

    load += mirror.length - i;
  }

  return load;
};

type Mirrors = Array<string>;

let mirrors: Mirrors = fs.readFileSync("day14/input").toString().split("\n");

let inverted = invertArray(mirrors);

for (let cycle = 0; cycle < 1018; cycle++) {
  let northMirror: Array<string> = [];
  for (let i = 0; i < mirrors.length; i++) {
    northMirror.push(pointMirrorNorth(inverted[i].split("")).join(""));
  }

  inverted = invertArray(northMirror);
  let westMirror: Array<string> = [];
  for (let i = 0; i < mirrors.length; i++) {
    westMirror.push(pointMirrorNorth(inverted[i].split("")).join(""));
  }

  inverted = invertArray(westMirror);
  let southMirror: Array<string> = [];
  for (let i = 0; i < mirrors.length; i++) {
    southMirror.push(pointMirrorEast(inverted[i].split("")).join(""));
  }

  inverted = invertArray(southMirror);
  let eastMirror: Array<string> = [];

  for (let i = 0; i < mirrors.length; i++) {
    let newMirror = pointMirrorEast(inverted[i].split(""));
    eastMirror.push(newMirror.join(""));
  }

  inverted = invertArray(eastMirror);

  // console.log(eastMirror);

  let total = 0;
  for (let i = 0; i < mirrors.length; i++) {
    total += calculateLoad(inverted[i].split(""));
  }
  console.log("cycle : ", cycle + " " + total);
}

// Only calculate first 1000 cycles then do modulo

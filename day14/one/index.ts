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
const invertedMirrors = invertArray(mirrors);

let totalLoad = 0;
for (let i = 0; i < invertedMirrors.length; i++) {
  console.log(invertedMirrors[i]);
  const northMirror = pointMirrorNorth(invertedMirrors[i].split(""));
  console.log(northMirror);
  totalLoad += calculateLoad(northMirror);
}

console.log(totalLoad);

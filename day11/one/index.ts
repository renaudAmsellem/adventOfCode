import * as fs from "fs";

type Universe = Array<string>;

const expandUniverse = (universe: Universe): Universe => {
  let expandedUniverse: Universe = JSON.parse(JSON.stringify(universe));
  for (let row = universe[0].length - 1; row >= 0; row--) {
    if (universe[row].split("").find((space) => space === "#")) {
      continue;
    }
    console.log("Add rows");
    expandedUniverse.splice(row, 0, ".".repeat(universe.length));
  }

  for (let column = universe[0].length - 1; column >= 0; column--) {
    let isEmptyColumn = true;
    for (let row = 0; row < universe.length; row++) {
      if (universe[row][column] === "#") {
        isEmptyColumn = false;
      }
    }

    if (isEmptyColumn)
      expandedUniverse = expandedUniverse.map((row) => {
        console.log("Add columns");
        return (
          row.substring(0, column) + "." + row.substring(column, row.length)
        );
      });
  }

  return expandedUniverse;
};

let universe = fs.readFileSync("day11/input").toString().split("\n");
const expandedUniverse = expandUniverse(universe);

type Galaxy = [number, number];
type Galaxies = Array<Galaxy>;
const galaxies: Galaxies = [];

for (let i = 0; i < expandedUniverse.length; i++) {
  for (let j = 0; j < expandedUniverse[i].length; j++) {
    if (expandedUniverse[i][j] !== "#") continue;
    galaxies.push([i, j]);
  }
}

const calcDistanceBetweenGalaxies = (
  galaxy1: Galaxy,
  galaxy2: Galaxy
): number => {
  return Math.abs(galaxy1[0] - galaxy2[0]) + Math.abs(galaxy1[1] - galaxy2[1]);
};

let distance: number = 0;
for (let i = 0; i < galaxies.length - 1; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    distance += calcDistanceBetweenGalaxies(galaxies[i], galaxies[j]);
  }
}

console.log(distance);

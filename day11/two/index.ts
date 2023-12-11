import * as fs from "fs";

type Universe = Array<string>;

const getRowsAdded = (universe: Universe) => {
  const rowsAdded: Array<number> = [];
  for (let row = universe[0].length - 1; row >= 0; row--) {
    if (universe[row].split("").find((space) => space === "#")) {
      continue;
    }
    rowsAdded.push(row);
  }

  return rowsAdded;
};

const getColumnsAdded = (universe: Universe) => {
  const columnsAdded: Array<number> = [];
  for (let column = universe[0].length - 1; column >= 0; column--) {
    let isEmptyColumn = true;
    for (let row = 0; row < universe.length; row++) {
      if (universe[row][column] === "#") {
        isEmptyColumn = false;
      }
    }

    if (isEmptyColumn) {
      columnsAdded.push(column);
    }
  }

  return columnsAdded;
};

let universe = fs.readFileSync("day11/input").toString().split("\n");

type Galaxy = [number, number];
type Galaxies = Array<Galaxy>;
const galaxies: Galaxies = [];

for (let i = 0; i < universe.length; i++) {
  for (let j = 0; j < universe[i].length; j++) {
    if (universe[i][j] !== "#") continue;
    galaxies.push([i, j]);
  }
}

const rowsAdded = getRowsAdded(universe);
const columnsAdded = getColumnsAdded(universe);

console.log("rowsAdded : ", rowsAdded);
console.log("columnsAdded : ", columnsAdded);
console.log("galaxies : ", galaxies);

const calcDistanceBetweenGalaxiesWithExpansion = (
  galaxy1: Galaxy,
  galaxy2: Galaxy
): number => {
  const distanceBetweenGalaxies = calcDistanceBetweenGalaxies(galaxy1, galaxy2);
  const expansionDistance = calcExpansionDistance(galaxy1, galaxy2);
  return distanceBetweenGalaxies + expansionDistance;
};

const calcDistanceBetweenGalaxies = (
  galaxy1: Galaxy,
  galaxy2: Galaxy
): number => {
  return Math.abs(galaxy1[0] - galaxy2[0]) + Math.abs(galaxy1[1] - galaxy2[1]);
};

const calcExpansionDistance = (galaxy1: Galaxy, galaxy2: Galaxy): number => {
  const expansionFactor = 999_999;
  let expansionDistance: number = 0;
  for (let row = 0; row < rowsAdded.length; row++) {
    if (
      galaxy1[0] > galaxy2[0] &&
      rowsAdded[row] > galaxy2[0] &&
      rowsAdded[row] < galaxy1[0]
    )
      expansionDistance += expansionFactor;

    if (
      galaxy1[0] < galaxy2[0] &&
      rowsAdded[row] < galaxy2[0] &&
      rowsAdded[row] > galaxy1[0]
    )
      expansionDistance += expansionFactor;
  }

  for (let column = 0; column < columnsAdded.length; column++) {
    if (
      galaxy1[1] > galaxy2[1] &&
      columnsAdded[column] > galaxy2[1] &&
      columnsAdded[column] < galaxy1[1]
    )
      expansionDistance += expansionFactor;

    if (
      galaxy1[1] < galaxy2[1] &&
      columnsAdded[column] < galaxy2[1] &&
      columnsAdded[column] > galaxy1[1]
    )
      expansionDistance += expansionFactor;
  }

  return expansionDistance;
};

let distance: number = 0;
for (let i = 0; i < galaxies.length - 1; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    distance += calcDistanceBetweenGalaxiesWithExpansion(
      galaxies[i],
      galaxies[j]
    );
  }
}

console.log(distance);

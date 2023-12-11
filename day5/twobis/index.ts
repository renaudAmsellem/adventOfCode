import * as fs from "fs";

type Map = {
  source: number;
  destination: number;
  range: number;
};

const getMap = (
  almanac: string[],
  indexStart: number,
  indexEnd: number
): Array<Map> => {
  let result: Array<Map> = [];
  for (let i = indexStart; i < indexEnd; i++) {
    const almanacValues = almanac[i].split(" ");
    result.push({
      destination: Number(almanacValues[0]),
      source: Number(almanacValues[1]),
      range: Number(almanacValues[2]),
    });
  }
  return result;
};

const getDestinatonFromSource = (item: number, maps: Array<Map>): number => {
  for (let i = 1; i < maps.length; i++) {
    const map = maps[i];
    if (item >= map.source && item < map.source + map.range) {
      return map.destination + item - map.source;
    }
  }
  return item;
};

const input = fs.readFileSync("day5/input").toString();

function solve2(input) {
  let [seeds, ...maps] = input.split("\n\n");
  seeds = seeds.match(/\d+/g).map(Number);
  const nextSeeds = [];
  for (let i = 0; i < seeds.length; i += 2) {
    nextSeeds.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
  }
  seeds = nextSeeds;

  console.log(seeds);
  console.log(maps);

  for (let map of maps) {
    map = map
      .split("\n")
      .slice(1)
      .map((line) => line.match(/\d+/g).map(Number));

    const movedSeeds = [];
    for (const [dest, source, len] of map) {
      const unmovedSeeds = [];
      for (const [start, end] of seeds) {
        if (start < source + len && end >= source) {
          movedSeeds.push([
            Math.max(start, source) - source + dest,
            Math.min(end, source + len - 1) - source + dest,
          ]);
        }
        if (start < source) {
          unmovedSeeds.push([start, Math.min(end, source - 1)]);
        }
        if (end >= source + len) {
          unmovedSeeds.push([Math.max(start, source + len), end]);
        }
      }
      seeds = unmovedSeeds;
    }
    seeds.push(...movedSeeds);
  }
  console.log(Math.min(...seeds.flat()));
}
solve2(input);

// type Range = {
//   start: number;
//   end: number;
// };

// const seeds = almanac[0].substring(almanac[0].indexOf(":") + 2).split(" ");
// const seedRanges: Array<Range> = [];
// for (let i = 0; i < seeds.length; i++) {
//   if (i % 2 === 0) {
//     seedRanges.push({ start: Number(seeds[i]), end: 0 });
//   } else {
//     seedRanges[seedRanges.length - 1].end =
//       seedRanges[seedRanges.length - 1].start + Number(seeds[i]);
//   }
// }
// console.log(seedRanges);

// const seedToSoil = getMap(almanac, 3, 36);
// const soilToFertilizer = getMap(almanac, 38, 79);
// const fertilizerToWater = getMap(almanac, 81, 123);
// const waterToLight = getMap(almanac, 125, 152);
// const lightToTemperature = getMap(almanac, 154, 192);
// const temperatureToHumidity = getMap(almanac, 194, 207);
// const humidityToLocation = getMap(almanac, 209, 235);

// let lowestLocation: number = 999999999999999;
// for (let i = seedRanges[0].start; i <= seedRanges[0].end; i++) {
//   if (i % 1_000_000 === 0) console.log("i : ", i);
//   const soil = getDestinatonFromSource(i, seedToSoil);
//   const fertilizer = getDestinatonFromSource(soil, soilToFertilizer);
//   const water = getDestinatonFromSource(fertilizer, fertilizerToWater);
//   const light = getDestinatonFromSource(water, waterToLight);
//   const temperature = getDestinatonFromSource(light, lightToTemperature);
//   const humidity = getDestinatonFromSource(temperature, temperatureToHumidity);
//   const location = getDestinatonFromSource(humidity, humidityToLocation);

//   if (location < lowestLocation) {
//     lowestLocation = location;
//   }
// }

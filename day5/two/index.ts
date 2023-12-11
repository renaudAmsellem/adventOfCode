import * as fs from "fs";

type Map = {
  source: number;
  destination: number;
  end: number;
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
      end: Number(almanacValues[1]) + Number(almanacValues[2]),
    });
  }
  return result;
};

const getRangesFromSource = (range: Range, maps: Array<Map>): Array<Range> => {
  const newRanges: Array<Range> = [];
  for (let i = 0; i < maps.length; i++) {
    const newRange: Range = { start: 0, end: 0 };
    const map = maps[i];
    if (range.start > map.end || range.end < map.source) continue;
    if (range.start > map.source) {
      newRange.start = range.start;
    } else {
      newRange.start = map.source;
    }
    if (range.end > map.end) {
      newRange.end = range.end;
    } else {
      newRange.end = map.end;
    }
    newRanges.push(newRange);
  }
  return newRanges;
};

const almanac = fs.readFileSync("day5/input").toString().split("\n");

type Range = {
  start: number;
  end: number;
};

const seeds = almanac[0].substring(almanac[0].indexOf(":") + 2).split(" ");
const seedRanges: Array<Range> = [];
for (let i = 0; i < seeds.length; i++) {
  if (i % 2 === 0) {
    seedRanges.push({ start: Number(seeds[i]), end: 0 });
  } else {
    seedRanges[seedRanges.length - 1].end =
      seedRanges[seedRanges.length - 1].start + Number(seeds[i]);
  }
}
console.log(seedRanges);

const seedToSoil = getMap(almanac, 3, 36);
const soilToFertilizer = getMap(almanac, 38, 79);
const fertilizerToWater = getMap(almanac, 81, 123);
const waterToLight = getMap(almanac, 125, 152);
const lightToTemperature = getMap(almanac, 154, 192);
const temperatureToHumidity = getMap(almanac, 194, 207);
const humidityToLocation = getMap(almanac, 209, 235);

console.log(seedToSoil);

let allLocationRanges: Array<Range> = [];
for (let i = 0; i < seedRanges.length; i++) {
  const soilRanges = getRangesFromSource(seedRanges[i], seedToSoil);
  const fertilizerRanges = getRangesFromSource(soilRanges[0], soilToFertilizer);
  const waterRanges = getRangesFromSource(
    fertilizerRanges[0],
    fertilizerToWater
  );
  const lightRanges = getRangesFromSource(waterRanges[0], waterToLight);
  const temperatureRanges = getRangesFromSource(
    lightRanges[0],
    lightToTemperature
  );
  const humidityRanges = getRangesFromSource(
    temperatureRanges[0],
    temperatureToHumidity
  );
  const locationRanges = getRangesFromSource(
    humidityRanges[0],
    humidityToLocation
  );

  allLocationRanges.push(...locationRanges);
}

// allLocationRanges.reduce((range) => )

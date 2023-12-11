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

const almanac = fs.readFileSync("day5/input").toString().split("\n");

const seeds = almanac[0].substring(almanac[0].indexOf(":") + 2).split(" ");
const seedToSoil = getMap(almanac, 3, 36);
const soilToFertilizer = getMap(almanac, 38, 79);
const fertilizerToWater = getMap(almanac, 81, 123);
const waterToLight = getMap(almanac, 125, 152);
const lightToTemperature = getMap(almanac, 154, 192);
const temperatureToHumidity = getMap(almanac, 194, 207);
const humidityToLocation = getMap(almanac, 209, 235);

let lowestLocation: number = 999999999999999;
for (let i = 0; i < seeds.length; i++) {
  const soil = getDestinatonFromSource(Number(seeds[i]), seedToSoil);
  const fertilizer = getDestinatonFromSource(soil, soilToFertilizer);
  const water = getDestinatonFromSource(fertilizer, fertilizerToWater);
  const light = getDestinatonFromSource(water, waterToLight);
  const temperature = getDestinatonFromSource(light, lightToTemperature);
  const humidity = getDestinatonFromSource(temperature, temperatureToHumidity);
  const location = getDestinatonFromSource(humidity, humidityToLocation);

  if (location < lowestLocation) {
    lowestLocation = location;
  }
}

console.log(lowestLocation);

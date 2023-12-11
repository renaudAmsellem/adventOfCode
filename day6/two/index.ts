type Input = {
  time: number;
  distance: number;
};

const input: Array<Input> = [
  {
    time: 38677673,
    distance: 234102711571236,
  },
];

const calcDistance = (accel: number, totalTime: number): number => {
  return accel * (totalTime - accel);
};

const getAllPossibilities = (time: number): Array<number> => {
  const possibilities: Array<number> = [];
  for (let i = 0; i <= time; i++) {
    possibilities.push(calcDistance(i, time));
  }
  return possibilities;
};

let results: Array<number> = [];
for (let i = 0; i < input.length; i++) {
  const possibilities = getAllPossibilities(input[i].time);
  results.push(
    possibilities.filter((possibility) => possibility > input[i].distance)
      .length
  );
}

const result = results.reduce((a, b) => a * b, 1);

console.log(result);

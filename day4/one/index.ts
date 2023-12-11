import * as fs from "fs";

const countMyWinningNumbers = (
  winningNumbers: number[],
  myNumbers: number[]
): number => {
  let count = 0;
  for (let i = 0; i < winningNumbers.length; i++) {
    if (myNumbers.includes(winningNumbers[i])) count++;
  }
  return count;
};

const inputCards = fs.readFileSync("day4/input").toString().split("\n");
let result = 0;
for (let i = 0; i < inputCards.length; i++) {
  const stripedCard = inputCards[i].substring(inputCards[i].indexOf(":") + 2);
  const winningNumbers: Array<number> = stripedCard
    .substring(0, stripedCard.indexOf("|"))
    .split(" ")
    .filter(Number)
    .map(Number);

  const myNumbers: Array<number> = stripedCard
    .substring(stripedCard.indexOf("|") + 2)
    .split(" ")
    .filter(Number)
    .map(Number);

  const countMyNumbersWinning = countMyWinningNumbers(
    winningNumbers,
    myNumbers
  );

  const points = {
    0: 0,
    1: 1,
    2: 2,
    3: 4,
    4: 8,
    5: 16,
    6: 32,
    7: 64,
    8: 128,
    9: 256,
    10: 512,
  };

  console.log(points[countMyNumbersWinning]);

  result += points[countMyNumbersWinning];
  console.log(countMyNumbersWinning);
}

console.log(result);

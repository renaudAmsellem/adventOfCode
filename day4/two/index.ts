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

const addDuplicatedCards = (allCounts: number[]) => {
  const allCountsWithDuplicated = [...Array(allCounts.length).keys()].map(
    () => 1
  );
  for (let cardNb = 0; cardNb < allCounts.length; cardNb++) {
    if (!(allCounts[cardNb] > 0)) continue;

    for (let winningNb = 0; winningNb < allCounts[cardNb]; winningNb++) {
      if (winningNb + cardNb >= allCounts.length) continue;

      allCountsWithDuplicated[winningNb + cardNb + 1] +=
        allCountsWithDuplicated[cardNb];
    }
  }
  return allCountsWithDuplicated;
};

const inputCards = fs.readFileSync("day4/input").toString().split("\n");
let allCountMyWinningNumbers: number[] = [];
for (let i = 0; i < inputCards.length; i++) {
  const stripedCard = inputCards[i].substring(inputCards[i].indexOf(":") + 2);

  const winningNumbers = stripedCard
    .substring(0, stripedCard.indexOf("|"))
    .split(" ")
    .filter(Number)
    .map(Number);

  const myNumbers = stripedCard
    .substring(stripedCard.indexOf("|") + 2)
    .split(" ")
    .filter(Number)
    .map(Number);

  const countMyNumbersWinning = countMyWinningNumbers(
    winningNumbers,
    myNumbers
  );

  allCountMyWinningNumbers.push(countMyNumbersWinning);
}

const allCountWinningNumbersWithDuplicated = addDuplicatedCards(
  allCountMyWinningNumbers
);
const result = allCountWinningNumbersWithDuplicated.reduce((a, b) => a + b, 0);
console.log(allCountMyWinningNumbers);
console.log(allCountWinningNumbersWithDuplicated);
console.log(result);

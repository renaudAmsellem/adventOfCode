import * as fs from "fs";

type CardStrength = { [key: string]: number };
type CardCount = { [key: string]: number };

const cardStrength: CardStrength = {
  A: 15,
  K: 14,
  Q: 13,
  T: 11,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  J: 1,
};

type Hand = string;

const transformJokers = (hand: Hand): Hand => {
  const jokerCount: number = hand.split("J").length - 1;
  const handWithoutJokers = hand.replace(/J/g, "");
  // console.log("hand & jokerCount : ", hand, jokerCount, handWithoutJokers);

  if (jokerCount === 0) return hand;
  if (jokerCount === 1) {
    const strength = getStrengthByCard(handWithoutJokers);
    for (const [card, value] of Object.entries(strength)) {
      if ([2, 3, 4].includes(value)) return `${card}${handWithoutJokers}`;
    }
    return `${handWithoutJokers}${handWithoutJokers[0]}`;
  }
  if (jokerCount === 2) {
    const strength = getStrengthByCard(handWithoutJokers);
    for (const [card, value] of Object.entries(strength)) {
      if ([2, 3].includes(value)) return `${card}${card}${handWithoutJokers}`;
    }
    return `${handWithoutJokers}${handWithoutJokers[0]}${handWithoutJokers[0]}`;
  }
  if (jokerCount === 3) {
    const strength = getStrengthByCard(handWithoutJokers);
    for (const [card, value] of Object.entries(strength)) {
      if ([2].includes(value))
        return `${card}${card}${card}${handWithoutJokers}`;
    }
    return `${handWithoutJokers}${handWithoutJokers[0]}${handWithoutJokers[0]}${handWithoutJokers[0]}`;
  }
  if (jokerCount === 4) {
    const lastChar = hand.split("").find((char) => char !== "J");
    return `${lastChar}${lastChar}${lastChar}${lastChar}${lastChar}`;
  }
  return "AAAAA";
};

const getStrengthByCard = (hand: Hand): CardCount => {
  let strength: CardCount = {};
  for (const [card, value] of Object.entries(cardStrength)) {
    strength[card] = Number(hand.split(card).length) - 1;
  }
  return strength;
};

const getHandStrength = (hand: Hand): number => {
  const strength = getStrengthByCard(hand);

  if (Object.values(strength).find((s) => s === 5)) {
    return 10;
  }
  if (Object.values(strength).find((s) => s === 4)) {
    return 9;
  }
  if (
    Object.values(strength).find((s) => s === 3) &&
    Object.values(strength).find((s) => s === 2)
  ) {
    return 8;
  }
  if (Object.values(strength).find((s) => s === 3)) {
    return 7;
  }
  if (Object.values(strength).filter((s) => s === 2).length === 2) {
    return 6;
  }
  if (Object.values(strength).find((s) => s === 2)) {
    return 5;
  }
  return 4;
};

const sortHands = (hand1: HandAndBid, hand2: HandAndBid): number => {
  console.log(hand1.hand, transformJokers(hand1.hand));
  const strength1 = getHandStrength(transformJokers(hand1.hand));
  const strength2 = getHandStrength(transformJokers(hand2.hand));
  if (strength1 > strength2) return 1;
  if (strength2 > strength1) return -1;
  for (let cardNumber = 0; cardNumber < hand1.hand.length; cardNumber++) {
    if (
      cardStrength[hand1.hand[cardNumber]] >
      cardStrength[hand2.hand[cardNumber]]
    )
      return 1;
    if (
      cardStrength[hand1.hand[cardNumber]] <
      cardStrength[hand2.hand[cardNumber]]
    )
      return -1;
  }
  return 0;
};

type HandAndBid = {
  hand: Hand;
  bid: number;
};

type HandsAndBids = Array<HandAndBid>;

let handsAndBidsFile = fs.readFileSync("day7/input").toString().split("\n");
const handsAndBids: HandsAndBids = [];
for (let i = 0; i < handsAndBidsFile.length; i++) {
  const stringData = handsAndBidsFile[i].split(" ");
  handsAndBids.push({ hand: stringData[0], bid: Number(stringData[1]) });
}

handsAndBids.sort(sortHands);
// console.log(handsAndBids);

let result = 0;
for (let i = 0; i < handsAndBids.length; i++) {
  result += handsAndBids[i].bid * (i + 1);
}

console.log(result);

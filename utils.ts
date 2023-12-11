export const isNumeric = (n: string) =>
  !isNaN(parseFloat(n)) && isFinite(Number(n));

export const twoNumbersToOne = (one: number, two: number) =>
  Number(one.toString() + two.toString());

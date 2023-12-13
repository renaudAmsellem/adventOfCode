export const isNumeric = (n: string) =>
  !isNaN(parseFloat(n)) && isFinite(Number(n));

export const twoNumbersToOne = (one: number, two: number) =>
  Number(one.toString() + two.toString());

export const invertArray = (array: Array<string>): Array<string> => {
  const invertedArray: Array<string> = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      invertedArray[j]
        ? (invertedArray[j] += array[i][j])
        : (invertedArray[j] = array[i][j]);
    }
  }
  return invertedArray;
};

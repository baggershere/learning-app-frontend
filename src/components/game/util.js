export const calculateCategoryX = (width, index) => {
  return index === 1 || index === 4 || index === 7 || index === 10
    ? width * 0.2
    : index === 2 || index === 5 || index === 8 || index === 11
    ? width * 0.5
    : index === 3 || index === 6 || index === 9 || index === 12
    ? width * 0.8
    : 0;
};
export const calculateCategoryY = (height, index) => {
  return index >= 1 && index <= 3
    ? height * 0.33
    : index >= 4 && index <= 6
    ? height * 0.66
    : index >= 7 && index <= 9
    ? height * 1
    : 0;
};
export const selectRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
export function shuffle(array) {
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

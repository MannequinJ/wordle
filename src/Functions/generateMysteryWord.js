import generateRandomNumber from "./generateRandomNumber";
const generateMysteryWord = (arr) =>
  arr[generateRandomNumber(arr.length)].toUpperCase().split("");

export default generateMysteryWord;

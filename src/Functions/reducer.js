import ACTIONS from "../Constants/ACTIONS";
import { nanoid } from "nanoid";
import EMPTY_CHAR from "../Constants/EMPTY_CHAR";
import EMPTY_WORDS_ARR from "../Constants/EMPTY_WORDS_ARR";
import charCounter from "./charCounter";
import WORDS from "../Constants/WORDS";
import generateMysteryWord from "./generateMysteryWord";
const reducer = (state, action) => {
  let currentWord;
  let currentWordsArr;
  let currentWordFilled;
  let message;
  let gameStatus;
  switch (action.type) {
    case ACTIONS.KEY_PRESS:
      if (!state.gameIsEnded) {
        const currentChar = {
          id: nanoid(),
          text: action.payload.toUpperCase(),
          status: "",
        };
        currentWord = [...state.currentWord, currentChar];
        currentWordsArr = [...state.wordsArr];
        currentWordFilled = [...currentWord];
        for (let i = currentWord.length; i < 5; i++) {
          currentWordFilled.push(EMPTY_CHAR);
        }
        currentWordsArr.splice(state.currentRow, 1, currentWordFilled);
        if (state.currentWord.length < 5 && state.currentRow < 6) {
          return {
            ...state,
            currentWord: currentWord,
            wordsArr: currentWordsArr,
            message: "",
            currentCharIndex: state.currentCharIndex + 1,
          };
        } else {
          return state;
        }
      } else {
        return {
          ...state,
        };
      }
    case ACTIONS.DELETE_CHAR:
      if (!state.gameIsEnded) {
        currentWordsArr = [...state.wordsArr];
        currentWord = [...currentWordsArr[state.currentRow]];
        currentWord.splice(state.currentCharIndex, 1, EMPTY_CHAR);
        currentWordsArr.splice(state.currentRow, 1, currentWord);
        return {
          ...state,
          currentWord: state.currentWord.slice(0, -1),
          wordsArr: currentWordsArr,
          currentCharIndex: state.currentCharIndex - 1,
        };
      } else {
        return {
          ...state,
        };
      }
    case ACTIONS.CONFIRM_WORD:
      if (!state.gameIsEnded) {
        const mysteryWordCharsNumber = charCounter(state.mysteryWord.join(""));
        if (state.currentWord.length === 5) {
          //  && state.currentRow < 6
          const newCurrentWord = state.currentWord.map((char, i) => {
            let charStatus;
            for (let k = 0; k < state.mysteryWord.length; k++) {
              if (char.text === state.mysteryWord[k] && i === k) {
                mysteryWordCharsNumber[char.text] -= 1;
                charStatus = "correct-spot";
                break;
              } else if (
                char.text === state.mysteryWord[k] &&
                i !== k &&
                mysteryWordCharsNumber[char.text]
              ) {
                charStatus = "wrong-spot";
                mysteryWordCharsNumber[char.text] -= 1;
                // break;
              }
            }
            charStatus = !charStatus ? "wrong-char" : charStatus;
            return {
              ...char,
              status: charStatus,
            };
          });
          const newWordsArr = [...state.wordsArr];
          newWordsArr.splice(state.currentRow, 1, newCurrentWord);
          ////////////////
          if (
            state.currentRow === 5 &&
            !newCurrentWord.every((char) => char.status === "correct-spot")
          ) {
            gameStatus = true;
            message = state.mysteryWord.join("");
          }
          if (newCurrentWord.every((char) => char.status === "correct-spot")) {
            gameStatus = true;
            message = "Good job!";
          }

          // console.log(message);
          ////////////////
          return {
            ...state,
            wordsArr: newWordsArr,
            currentWord: [],
            message: message,
            currentCharIndex: -1,
            currentRow: state.currentRow + 1,
            gameIsEnded: gameStatus,
          };
        } else {
          return {
            ...state,
            message: "Not enough letters",
          };
        }
      } else {
        return {
          ...state,
        };
      }
    case ACTIONS.START_NEW_GAME:
      return {
        ...state,
        wordsArr: EMPTY_WORDS_ARR,
        mysteryWord: generateMysteryWord(WORDS),
        currentWord: [],
        currentCharIndex: -1,
        currentRow: 0,
        message: "",
        gameIsEnded: false,
      };
    default:
      return state;
  }
};
export default reducer;

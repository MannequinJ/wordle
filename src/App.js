import React, { useEffect, useReducer } from "react";
import "./index.css";
import WORDS from "./Constants/WORDS.js";
import generateMysteryWord from "./Functions/generateMysteryWord";
import reducer from "./Functions/reducer";
import Board from "./Components/Board";
import handleKeyPress from "./Functions/handleKeyPress";
import EMPTY_WORDS_ARR from "./Constants/EMPTY_WORDS_ARR";
import ACTIONS from "./Constants/ACTIONS";
import Expire from "./Components/Expire";

// const solution = generateMysteryWord(WORDS);
export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    mysteryWord: generateMysteryWord(WORDS),
    wordsArr: EMPTY_WORDS_ARR,
    currentWord: [],
    currentCharIndex: -1,
    currentRow: 0,
    message: "",
    gameIsEnded: false,
  });

  useEffect(
    () =>
      document.addEventListener("keydown", (e) => handleKeyPress(e, dispatch)),
    []
  );

  // console.log(state.mysteryWord);
  console.log(state);

  return (
    <div className="App">
      <div className="header">
        <h1>Wordle</h1>
      </div>
      {state.message && (
        <Expire delay="2000">
          <div className="modal">
            <div className="error-message">
              <h1>{state.message}</h1>
            </div>
          </div>
        </Expire>
      )}
      {state.gameIsEnded && (
        <div className="modal">
          <div className="message">
            <h1>{state.message}</h1>
            <button
              className="start-new-game-button"
              onClick={() => dispatch({ type: ACTIONS.START_NEW_GAME })}
            >
              New Game
            </button>
          </div>
        </div>
      )}
      <div className="game">
        <Board data={state} />
      </div>
    </div>
  );
}

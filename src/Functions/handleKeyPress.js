import ACTIONS from "../Constants/ACTIONS";
import SPECIAL_CHARS from "../Constants/SPECIAL_CHARS";
import checkForSpecialChars from "./checkForSpecialChars";

const handleKeyPress = (e, dispatch) => {
  const pressedKey = e.key.toUpperCase();
  console.log(pressedKey);
  if (pressedKey === "BACKSPACE") {
    dispatch({ type: ACTIONS.DELETE_CHAR });
  } else if (pressedKey === "ENTER") {
    dispatch({ type: ACTIONS.CONFIRM_WORD });
  } else if (
    pressedKey.length === 1 &&
    !isFinite(pressedKey) &&
    !checkForSpecialChars(pressedKey, SPECIAL_CHARS)
  ) {
    dispatch({ type: ACTIONS.KEY_PRESS, payload: e.key });
  } else {
    return;
  }
};
export default handleKeyPress;

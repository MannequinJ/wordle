import React from "react";

function charStyles(char) {
  if (char.status === "correct-spot") {
    return "correct-spot";
  } else if (char.status === "wrong-spot") {
    return "wrong-spot";
  } else if (char.status === "wrong-char") {
    return "wrong-char";
  } else {
    return;
  }
}

export default function Cell({ char }) {
  return (
    <div
      className={`cell ${char.id ? "filled-cell" : "empty-cell"} ${charStyles(
        char
      )}`}
    >
      <p>{char.text}</p>
    </div>
  );
}

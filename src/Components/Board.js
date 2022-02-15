import React from "react";
import ChainOfCells from "./ChainOfCells";
import { nanoid } from "nanoid";

export default function Board({ data }) {
  const wordsElements = data.wordsArr.map((word) => (
    <ChainOfCells key={nanoid()} word={word} />
  ));
  return <div className="board">{wordsElements}</div>;
}

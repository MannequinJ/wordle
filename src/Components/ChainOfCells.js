import React from "react";
import Cell from "./Cell";
import { nanoid } from "nanoid";

export default function ChainOfCells({ word }) {
  const charElements = word.map((char) => <Cell key={nanoid()} char={char} />);
  return <div className="chain-of-cells">{charElements}</div>;
}

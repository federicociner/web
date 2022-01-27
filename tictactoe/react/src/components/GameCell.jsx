import React from "react";
import PropTypes from "prop-types";

import "./GameCell.css";

const GameCell = (props) => {
  return (
    <div
      className="game__cell"
      onClick={(e) => props.handleClick(parseInt(props.cellId))}
      style={{ color: props.children === "X" ? "red" : "blue" }}>
      {props.children}
    </div>
  );
};

GameCell.propTypes = {
  cellId: PropTypes.number,
  children: PropTypes.node,
  handleClick: PropTypes.func,
};

export default GameCell;

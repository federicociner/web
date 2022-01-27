import React from "react";
import PropTypes from "prop-types";
import GameCell from "./GameCell";

import "./GameBoard.css";

const GameBoard = (props) => {
  const { gameState, handleUpdateGame, handleValidateResult, isGameActive } = props;

  const handleClick = (cellId) => {
    if (gameState[cellId] || !isGameActive) {
      return;
    }

    const newGameState = handleUpdateGame(cellId);
    handleValidateResult(newGameState);
  };

  return (
    <div className="game__board">
      {[...Array(9).keys()].map((number) => {
        return (
          <GameCell key={number} cellId={number} handleClick={handleClick}>
            {gameState[number]}
          </GameCell>
        );
      })}
    </div>
  );
};

GameBoard.propTypes = {
  gameState: PropTypes.arrayOf(String),
  handleUpdateGame: PropTypes.func,
  handleValidateResult: PropTypes.func,
  isGameActive: PropTypes.bool,
};

export default GameBoard;

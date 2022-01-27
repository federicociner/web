import { array } from "prop-types";
import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";

import "./index.css";

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const currentPlayerMessage = `It is Player ${currentPlayer}'s turn`;
  const [displayMessage, setDisplayMessage] = useState(currentPlayerMessage);
  const [gameState, setGameState] = useState(Array.from({ length: 9 }, () => ""));
  const [isGameActive, setIsGameActive] = useState(true);

  const handleChangePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setDisplayMessage(currentPlayerMessage);
  };

  const handleRestartGame = () => {
    setGameState(Array.from({ length: 9 }, () => ""));
    setCurrentPlayer("X");
    setDisplayMessage(currentPlayerMessage);
    setIsGameActive(true);
  };

  const handleValidateResult = (gameState) => {
    const winningStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let roundWon = false;

    for (let state of winningStates) {
      const a = gameState[state[0]];
      const b = gameState[state[1]];
      const c = gameState[state[2]];

      if (!a || !b || !c) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setDisplayMessage(`Player ${currentPlayer} wins!`);
      setIsGameActive(false);
      return;
    }

    const isDraw = !gameState.includes("");
    if (isDraw) {
      setDisplayMessage("Game is a draw.");
      setIsGameActive(false);
      return;
    }

    handleChangePlayer();
  };

  const handleUpdateGame = (cellId) => {
    let newGameState = [...gameState];
    newGameState[cellId] = currentPlayer;
    setGameState([...newGameState]);

    return newGameState;
  };

  useEffect(() => {
    setDisplayMessage(currentPlayerMessage);
  }, [currentPlayer, currentPlayerMessage]);

  return (
    <div className="game">
      <h1 className="game__title">Tic-Tac-Toe</h1>
      <GameBoard
        gameState={gameState}
        handleUpdateGame={handleUpdateGame}
        handleValidateResult={handleValidateResult}
        isGameActive={isGameActive}
      />
      <h2 className="game__status">{displayMessage}</h2>
      <button className="game__restart" onClick={handleRestartGame}>
        Restart game
      </button>
    </div>
  );
};

export default App;

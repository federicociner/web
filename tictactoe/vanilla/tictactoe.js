// DOM elements
var statusDisplay = document.querySelector(".game__status");
var restartButton = document.querySelector(".game__restart");
var cells = document.querySelectorAll(".game__cell");

// Game state
var { currentPlayer, gameState, isGameActive } = getInitialState();

// Messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game is a draw.`;
const currentPlayerMessage = () => `It is ${currentPlayer}'s turn`;

// Initialise game state
updateStatus(currentPlayerMessage());

function handleCellClick(event) {
  const cellId = parseInt(event.target.dataset.cellId);

  if (gameState[cellId] || !isGameActive) {
    return;
  }

  updateGameState(cellId, gameState);
  renderCellContent(gameState);
  handleResultValidation(gameState);
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(currentPlayerMessage());
}

function handleResultValidation(gameState) {
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
    updateStatus(winningMessage());
    isGameActive = false;
    return;
  }

  const isDraw = !gameState.includes("");
  if (isDraw) {
    updateStatus(drawMessage());
    isGameActive = false;
    return;
  }

  handlePlayerChange();
}

function getInitialState() {
  return {
    currentPlayer: "X",
    isGameActive: true,
    gameState: ["", "", "", "", "", "", "", "", ""],
  };
}

function renderCellContent(gameState) {
  colours = {
    X: "red",
    O: "blue",
  };

  cells.forEach((cell) => {
    const cellId = cell.dataset.cellId;
    cell.style.color = colours[gameState[cellId]];
    cell.textContent = gameState[cellId];
  });
}

function updateGameState(cellId, gameState) {
  gameState[cellId] = currentPlayer;
}

function updateStatus(message) {
  statusDisplay.textContent = message;
}

// Add event listeners for grid cell buttons
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// Add event listener for restart button
restartButton.addEventListener("click", function () {
  const newGame = getInitialState();

  currentPlayer = newGame.currentPlayer;
  gameState = newGame.gameState;
  isGameActive = newGame.isGameActive;

  renderCellContent(gameState);
  updateStatus(currentPlayerMessage());
});

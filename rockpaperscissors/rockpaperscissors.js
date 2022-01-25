function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
  const choices = ["rock", "paper", "scissors"];
  const playerChoice = playerSelection.toLowerCase();
  const computerChoice = computerSelection.toLowerCase();

  if (!choices.includes(playerChoice)) {
    return "Invalid selection, please try again.";
  }

  if (playerChoice === computerChoice) {
    return "Tie game!";
  }

  switch (playerChoice) {
    case "rock":
      switch (computerChoice) {
        case "paper":
          return "You Lose! Paper beats Rock!";
        case "scissors":
          return "You Win! Rock beats Scissors!";
      }
    case "paper":
      switch (computerChoice) {
        case "rock":
          return "You Win! Paper beats Rock!";
        case "scissors":
          return "You Lose! Scissors beats Paper!";
      }
    case "scissors":
      switch (computerChoice) {
        case "rock":
          return "You Lose! Rock beats Scissors!";
        case "paper":
          return "You Win! Scissors beats Paper!";
      }
  }
}

function game() {
  const numRounds = 5;

  for (let i = 0; i < numRounds; i++) {
    console.log(`Round ${i + 1}`);
    const playerChoice = window.prompt(
      "Please choose rock, paper, or scissors"
    );
    const computerChoice = computerPlay();
    const result = playRound(playerChoice, computerChoice);
    console.log(result);
  }
}

import {
  createResultString,
  updateCalculatorState,
  updateVisualState,
} from "./calculator.js";

const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator-display");
const keys = calculator.querySelector(".calculator-keys");

// Initial state
calculator.dataset.firstNumber = 0;

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const displayedNumber = display.textContent;
    const calculatedValue = createResultString(
      displayedNumber,
      key,
      calculator.dataset
    );

    display.textContent = calculatedValue;
    updateCalculatorState(calculator, key, calculatedValue, displayedNumber);
    updateVisualState(calculator, key);
  }
});

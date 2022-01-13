import { calculate, getKeyType, keyLogger } from "./helpers.js";

export const createResultString = (currentDisplayedNumber, key, state) => {
  const keyType = getKeyType(key);
  const keyContent = key.textContent;
  const { firstNumber, modValue, operator, previousKeyType } = state;

  keyLogger(key);

  if (keyType === "number") {
    return currentDisplayedNumber === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
      ? keyContent
      : currentDisplayedNumber + keyContent;
  }

  if (keyType === "decimal") {
    return currentDisplayedNumber.includes(".")
      ? currentDisplayedNumber
      : currentDisplayedNumber + ".";
  }

  if (keyType === "operator") {
    return firstNumber &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstNumber, currentDisplayedNumber, operator)
      : currentDisplayedNumber;
  }

  if (keyType === "clear") {
    return 0;
  }

  if (keyType === "calculate") {
    return firstNumber
      ? previousKeyType === "calculate"
        ? calculate(currentDisplayedNumber, modValue, operator)
        : calculate(firstNumber, currentDisplayedNumber, operator)
      : currentDisplayedNumber;
  }
};

export const updateCalculatorState = (
  calculator,
  key,
  calculatedValue,
  displayedNumber
) => {
  const previousKeyType = calculator.dataset.previousKeyType;
  const firstNumber = calculator.dataset.firstNumber;
  const operator = calculator.dataset.operator;

  const keyType = getKeyType(key);
  calculator.dataset.previousKeyType = keyType;

  if (keyType === "operator") {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstNumber =
      firstNumber &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
        ? calculatedValue
        : displayedNumber;
  }

  if (keyType === "clear") {
    if (key.textContent === "CE") {
      calculator.dataset.firstNumber = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
    }
  }

  if (keyType === "calculate") {
    calculator.dataset.modValue =
      firstNumber && previousKeyType === "calculate"
        ? calculator.dataset.modValue
        : displayedNumber;
  }
};

export const updateVisualState = (calculator, key) => {
  Array.from(key.parentNode.children).forEach((key) =>
    key.classList.remove("active")
  );

  const keyType = getKeyType(key);

  if (keyType === "operator") {
    key.classList.add("active");
  }

  if (keyType === "clear" && key.textContent === "CE") {
    key.textContent = "AC";
  }

  if (keyType !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]");
    clearButton.textContent = "CE";
  }
};

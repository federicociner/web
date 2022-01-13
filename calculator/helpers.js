export const calculate = (firstNumber, secondNumber, action) => {
  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);

  const actions = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
  };

  return actions[action](a, b);
};

export const getKeyType = (key) => {
  const { action } = key.dataset;

  if (!action) return "number";

  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  )
    return "operator";

  return action;
};

export const keyLogger = (key) => {
  switch (getKeyType(key)) {
    case "number":
      console.log("number key!");
      break;
    case "operator":
      console.log("operator key!");
      break;
    case "clear":
      console.log("clear key!");
      break;
    case "calculate":
      console.log("equal key!");
      break;
    case "decimal":
      console.log("decimal key!");
      break;
    default:
      break;
  }
};

const display = document.querySelector("#display");
const buttons = document.querySelector(".buttons");

let currentInput = "";
let previousInput = "";
let currentOperator = "";
let shouldResetInput = false;

buttons.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches(".number")) {
    handleNumber(target.id);
  } else if (target.matches(".operator")) {
    handleOperator(target.id);
  } else if (target.matches(".action")) {
    handleAction(target.id);
  }
});

function handleNumber(num) {
  if (shouldResetInput) {
    currentInput = "";
    shouldResetInput = false;
  }
  if (num === "." && currentInput.includes(".")) return;
  currentInput += num;
  updateDisplay();
}

function handleOperator(op) {
  if (currentInput === "" && previousInput === "") return;

  if (op === "=") {
    if (currentInput !== "" && previousInput !== "" && currentOperator !== "") {
      calculate();
      updateDisplay();
      previousInput = "";
      currentOperator = "";
    }
  } else {
    if (currentInput !== "") {
      if (previousInput !== "") {
        calculate();
        updateDisplay();
      } else {
        previousInput = currentInput;
      }
    }
    currentOperator = op;
    shouldResetInput = true;
  }
}

function handleAction(action) {
  switch (action) {
    case "clear":
      clear();
      break;
    case "negate":
      currentInput = (-parseFloat(currentInput)).toString();
      break;
    case "percent":
      currentInput = (parseFloat(currentInput) / 100).toString();
      break;
  }
  updateDisplay();
}

function calculate() {
  if (previousInput === "" || currentInput === "" || currentOperator === "") return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;

  switch (currentOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current !== 0 ? prev / current : "Error";
      break;
    default:
      return;
  }

  currentInput = result.toString();
}

function clear() {
  currentInput = "";
  previousInput = "";
  currentOperator = "";
  shouldResetInput = false;
}

function updateDisplay() {
  display.value = currentInput || "0";
}

updateDisplay();

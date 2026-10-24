const state = {
    firstNumber: "",
    operator: "",
    secondNumber: "",
    display: "0",
    result: "",
    shouldResetDisplay: false
}

const $display = document.querySelector("#display");
const $buttons = document.querySelectorAll("[data-key]");
const $numberButtons = document.querySelectorAll(`[data-type="number"]`)

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0) ? "Error" : a / b;

const operate = (operator, a, b) => {

    let result;

    switch (operator) {
        case "+":
            result = add(a, b)
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
    }

    return result;
}

const updateDisplayState = (data) => {
    if (state.shouldResetDisplay) {
        state.display = (data === ".") ? "0." : data;
        state.shouldResetDisplay = false;
    } else {
        if (state.display === "0" && data !== ".") {
            state.display = data;
        } else if (state.display === "0" && data === ".") {
            state.display += data;
        } else {
            state.display += data;
        }
    }
}

const renderDisplay = (data) => { $display.textContent = data }

const clearDisplay = () => { state.display = "" }

const validateDecimal = (key) => {
    if (key === "." && state.display.includes(".")) return false;
    return true;
}

const handleNumberInput = (keyValue) => {

    if (!validateDecimal(keyValue)) return

    if (state.operator === "" && state.firstNumber !== "" && state.shouldResetDisplay) {
        state.firstNumber = "";
    }

    updateDisplayState(keyValue)
    renderDisplay(state.display);

}

const handleOperatorInput = (operatorValue) => {

    if (state.firstNumber === "" || state.operator === "") {
        state.firstNumber = Number(state.display);
        state.operator = operatorValue;
        clearDisplay();
    } else {
        state.secondNumber = Number(state.display);
        state.result = operate(state.operator, state.firstNumber, state.secondNumber);
        state.firstNumber = state.result;
        state.secondNumber = "";
        state.operator = operatorValue;
        clearDisplay();
        renderDisplay(state.result);
    }
    state.shouldResetDisplay = true;
}

const calculateResult = () => {

    if (state.operator === "" || state.firstNumber === "") return;

    state.secondNumber = Number(state.display)
    state.result = operate(state.operator, state.firstNumber, state.secondNumber)
    state.firstNumber = state.result
    state.display = String(state.result)

    renderDisplay(state.display)
    state.operator = "";
    state.secondNumber = "";

    state.shouldResetDisplay = true;
}

const allClear = () => {

    state.display = "0"
    state.firstNumber = ""
    state.secondNumber = ""
    state.result = ""
    state.operator = ""

    renderDisplay(state.display)

}
const deleteLastChar = () => {

    (state.display.length > 1) ? state.display = state.display.slice(0, -1) : state.display = "0"

    renderDisplay(state.display)
}

const handleClick = (e) => {
    const $target = e.target;

    if ($target.matches(`[data-type="number"]`) || $target.matches(`[data-type="decimal"]`)) {
        handleNumberInput($target.dataset.key)
    }
    if ($target.matches(`[data-type="operator"]`)) {
        handleOperatorInput($target.dataset.key)
    }
    if ($target.matches(`[data-type="result"]`)) {
        calculateResult()
    }
    if ($target.matches(`[data-type="allClear"]`)) {
        allClear();
    }
    if ($target.matches(`[data-type="clear"]`)) {
        deleteLastChar();
    }
}

document.addEventListener("click", handleClick);

const handleKeydown = (e) => {


    if (e.key >= 0 && e.key <= 9 || e.key === ".") {
        handleNumberInput(e.key)
    }

    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        handleOperatorInput(e.key)
    }

    if (e.key === "Enter") {
        calculateResult()
    }
    if (e.key === "Delete") {
        allClear()
    }
    if (e.key === "Backspace") {
        deleteLastChar()
    }
}

document.addEventListener("keydown", handleKeydown);
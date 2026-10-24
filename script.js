const state = {
    firstNumber: "",
    operator: "",
    secondNumber: "",
    display: "",
    result: ""
}

const $display = document.querySelector("#display");
const $btns = document.querySelectorAll("[data-key]");
const $btnsNumbers = document.querySelectorAll(`[data-type="number"]`)

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0) ? "Division por cero" : a / b;

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

        default:
            console.log("OPERADOR NO VALIDO")
            break;
    }

    return result;
}

const setDisplay = (data) => { state.display += data }

const renderDisplay = (data) => { $display.textContent = data }

const clearDisplay = () => { state.display = "" }

const clearState = () => {
    //state.firstNumber = ""
    //state.operator = ""
    state.secondNumber = ""
    //state.display = ""
    //state.result = ""
}

const numberKeyboard = (target) => {
    console.log(target.dataset.key)

    if (target.dataset.key === ".") {
        if (state.display.includes(".")) {
            console.log("No se puede agregar otro punto")
            return
        };
    }

    setDisplay(target.dataset.key)
    renderDisplay(state.display);

}

const operatorKeyboard = (target) => {
    if (state.firstNumber === "" || state.operator === "") {
        state.firstNumber = Number(state.display);
        state.operator = target.dataset.key;
        clearDisplay();
    } else {
        state.secondNumber = Number(state.display);
        state.result = operate(state.operator, state.firstNumber, state.secondNumber);
        state.firstNumber = state.result;
        state.secondNumber = "";
        state.operator = target.dataset.key;
        clearDisplay();
        renderDisplay(state.result);
    }

    console.log(state);
}

const solve = () => {

    state.secondNumber = Number(state.display)
    state.result = operate(state.operator, state.firstNumber, state.secondNumber)
    state.firstNumber = state.result
    state.display = String(state.result)

    renderDisplay(state.display)
    state.operator = "";
    state.secondNumber = "";
    console.log(state)
}

const handleClick = (e) => {
    const $target = e.target;

    if ($target.matches(`[data-type="number"]`) || $target.matches(`[data-type="decimal"]`)) {
        numberKeyboard($target)
    }
    if ($target.matches(`[data-type="operator"]`)) {
        operatorKeyboard($target)
    }
    if ($target.matches(`[data-type="result"]`)) {
        solve()
    }
}

document.addEventListener("click", handleClick);
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

const setDisplay = (data) => {
    (state.display === "0") ? state.display = data : state.display += data
}

const renderDisplay = (data) => { $display.textContent = data }

const clearDisplay = () => { state.display = "" }

const validateDecimal = (key) => {
    let result = true;

    if (key === ".") {
        if (state.display.includes(".")) {
            console.log("No se puede agregar otro punto")
            result = false
        };
    }

    return result;
}

const numberKeyboard = (target) => {

    if (typeof target === "object") {

        if (!validateDecimal()) return

        setDisplay(target.dataset.key)
        renderDisplay(state.display);

    } else {
        if (!validateDecimal()) return

        setDisplay(target)
        renderDisplay(state.display);
    }


}

const operatorKeyboard = (target) => {

    if (typeof target === "object") {
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
    } else {
        if (state.firstNumber === "" || state.operator === "") {
            state.firstNumber = Number(state.display);
            state.operator = target;
            clearDisplay();
        } else {
            state.secondNumber = Number(state.display);
            state.result = operate(state.operator, state.firstNumber, state.secondNumber);
            state.firstNumber = state.result;
            state.secondNumber = "";
            state.operator = target;
            clearDisplay();
            renderDisplay(state.result);
        }

        console.log(state);
    }

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

const allClear = () => {

    state.display = "0"
    state.firstNumber = ""
    state.secondNumber = ""
    state.result = ""
    state.operator = ""

    renderDisplay(state.display)

    console.log(state)
}
const clear = () => {

    (state.display.length > 1) ? state.display = state.display.slice(0, -1) : state.display = "0"

    renderDisplay(state.display)
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
    if ($target.matches(`[data-type="allClear"]`)) {
        allClear();
    }
    if ($target.matches(`[data-type="clear"]`)) {
        clear();
    }
}

document.addEventListener("click", handleClick);

const handleKeydown = (e) => {

    console.log(e.key)
    if (e.key >= 0 && e.key <= 9 || e.key === ".") {
        numberKeyboard(e.key)
    }

    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        operatorKeyboard(e.key)
    }

    if (e.key === "Enter") {
        solve()
    }
    if (e.key === "Delete") {
        allClear()
    }
    if (e.key === "Backspace") {
        clear()
    }
}

document.addEventListener("keydown", handleKeydown);
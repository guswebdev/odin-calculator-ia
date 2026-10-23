const state = {
    firstNumber: "",
    operator: "",
    secondNumber: "",
    display: "",
    counterDecimal: 0
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

const renderDisplay = () => { $display.textContent = state.display }

const numberKeyboard = (target) => {
    console.log(target.dataset.key)

    if(target.dataset.key === "."){
        if(state.display.includes(".")){
            console.log("No se puede agregar otro punto")
            return
        };
    }
    
    setDisplay(target.dataset.key)
    renderDisplay();

}

const handleClick = (e) => {
    const $target = e.target;

    if ($target.matches(`[data-type="number"]`) || $target.matches(`[data-type="decimal"]`)) {
        numberKeyboard($target)
    }
}

document.addEventListener("click", handleClick);
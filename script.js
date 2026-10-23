
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

console.log(operate(".", 3, 2))
const numbersButton = document.querySelectorAll("[data-number]");
const operationsButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const displayUpper = document.querySelector("[data-display-upper]");
const displayDown = document.querySelector("[data-display-down]");
const clearButton = document.querySelector("[data-clear]");
const allClearButton = document.querySelector("[data-all-clear]");


class Calculator {
    constructor(displayDown, displayUpper) {
        this.displayDown = displayDown;
        this.displayUpper = displayUpper;
        this.result = 0;
        this.allClear();
    }

    allClear() {
        this.currentNumber = "";
        this.operation = "";
        this.secondNumber = "";
    }

    clear() {
        if (this.result !== 0) return;
        displayDown.innerText = displayDown.innerText.slice(0, -1);
        calculator.currentNumber = calculator.currentNumber.slice(0, -1);
    }

    changeNumber(number) {
        if (this.result !== 0 || this.currentNumber.toString().includes(".") && number === ".") return;
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    changeOperator(operationButton) {
        if (this.currentNumber === "") return;
        if (this.operation !== "") {
            this.evaluate();
        }
        if (this.operation === "" && this.currentNumber === "") return;
        this.operation = operationButton;
        this.secondNumber = this.currentNumber;
        this.currentNumber = "";
        this.result = 0;
    }

    updateDisplay() {
        this.displayDown.innerText = this.currentNumber;
        this.displayUpper.innerText = `${this.secondNumber} ${this.operation}`;
    }

    evaluate() {
        let current = parseFloat(this.currentNumber);
        let second = parseFloat(this.secondNumber);
        if (this.operation === "/" && current === 0) {
            alert("YOU CANT DO THISSSS");
            this.allClear();
            return;
        }
        if (isNaN(current) || isNaN(second)) return;
        switch (this.operation) {
            case "+":
                this.result = second + current;
                break;
            case "-":
                this.result = second - current;
                break;
            case "/":
                this.result = second / current;
                break;
            case "*":
                this.result = second * current;
                break;
            case "%":
                this.result = second % current;
                break;
        }
        this.currentNumber = this.result;
        this.secondNumber = "";
        this.operation = "";
    }
}

const calculator = new Calculator(displayDown, displayUpper);

numbersButton.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        calculator.changeNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
});

operationsButton.forEach(operationButton => {
    operationButton.addEventListener("click", () => {
        calculator.changeOperator(operationButton.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener("click", () => {
    calculator.allClear();
})

equalButton.addEventListener("click", () => {
    calculator.evaluate();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.allClear();
    calculator.updateDisplay();
})

clearButton.addEventListener("click", () => {
    calculator.clear();
})


// ADDING KEYBOARD
function keyboardNums(num) {
    calculator.changeNumber(num);
    calculator.updateDisplay();
}

function keyboardOperations(operator) {
    calculator.changeOperator(operator);
    calculator.updateDisplay();
}

window.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "Backspace":
            calculator.clear();
            break;
        case "Digit0":
            keyboardNums("0");
            break;
        case "Digit1":
            keyboardNums("1");
            break;
        case "Digit2":
            keyboardNums("2");
            break;
        case "Digit3":
            keyboardNums("3");
            break;
        case "Digit4":
            keyboardNums("4");
            break;
        case "Digit5":
            keyboardNums("5");
            break;
        case "Digit6":
            keyboardNums("6");
            break;
        case "Digit7":
            keyboardNums("7");
            break;
        case "Digit8":
            keyboardNums("8");
            break;
        case "Digit9":
            keyboardNums("9");
            break;
        case "NumpadAdd":
            keyboardOperations("+");
            break;
        case "NumpadSubtract":
            keyboardOperations("-");
            break;
        case "NumpadDivide":
            keyboardOperations("/");
            break;
        case "NumpadMultiply":
            keyboardOperations("*");
            break;
        case "Enter":
            calculator.evaluate();
            calculator.updateDisplay();
            break;
        case "NumpadEnter":
            calculator.evaluate();
            calculator.updateDisplay();
            break;
        default:
            return;
    }
}, true)

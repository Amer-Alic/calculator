const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const equalSign = document.querySelector("#equal");
const signs = document.querySelectorAll(".sign");
const numbers = document.querySelectorAll(".numbers");
const buttonAC = document.querySelector("#AC");
const dot = document.querySelector("#dot");
const c = document.querySelector("#C");
let nums = [], operator = [], total;
// CHECK FOR NUMBERS
const regexOne = /(\-?\d+\.?\d*)(\%|\+|\-|\*|\/)(\d+\.?\d*)/g;
// CHECK FOR OPERATOR 
const regexTwo = /(\-?\d+)(\%|\+|\-|\*|\/)/g;


makePatterns(true, true)

function getOperator(regexp, str) {
    return Array.from(str.matchAll(regexp), m => m[2]);
}

function getNumbers(regexp, str) {
    const firstNum = Array.from(str.matchAll(regexp), m => m[1]);
    const secondNum = Array.from(str.matchAll(regexp), m => m[3]);
    return firstNum.concat(secondNum)
}

function add(a, b) {
    return a + b;
};
function subtract(a, b) {
    return a - b
};
function multiply(a, b) {
    return a * b;
};
function devide(a, b) {
    return a / b;
};
function percent(a, b) {
    return a % b;
}
function operate(operator, a, b) {
    switch (operator) {
        case "%":
            return percent(a, b);
            break;
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return devide(a, b);
            break;
        default:
            alert("ERROR, OPERATOR IS NOT VALID")
    };
}

function updateDispaly(button) {
    display.innerText += button;
}

function AC() {
    display.innerText = "";
    operator = [], nums = [];
}

function C() {
    display.innerText = display.innerText.slice(0, -1)
}

function evaluate() {
    total = operate(operator[0], parseInt(nums[0]), parseInt(nums[1]));
    display.innerText = total;
    makePatterns(true, true)
}

function makePatterns(doNums, doOperators) {
    if (doNums) {
        nums = getNumbers(regexOne, display.innerText);
    }
    if (doOperators) {
        operator = getOperator(regexTwo, display.innerText)
    }
}

function numberInput(text) {
    updateDispaly(text);
    // THIS MAKES AN ARRAY OF NUMBERS INPUTED
    makePatterns(true, false);
}

function isNumberKey(evt) {
    // ONLY NUMBERS
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46 || charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    numberInput(evt.key)
}

for (let number of numbers) {
    number.addEventListener("click", () => {
        numberInput(number.innerText)
    })
}

for (let sign of signs) {
    sign.addEventListener("click", () => {
        makePatterns(false, true);
        // DISABLE SIGNS IF DISPLAY IS EMPTY
        if (display.innerText === "" && (sign.innerText === "+" || sign.innerText === "/" || sign.innerText === "*" || sign.innerText === "/"
            || sign.innerText === "%")) { return }
        // DISABLE INPUTING MULTIPLE SIGNS IN A ROW
        if (operator?.length === 1 && nums.length < 2) {
            operator.splice(0, 1, sign.innerText);
            let slicedStr = display.innerText.split("");
            slicedStr.splice(slicedStr.length - 1, 1, sign.innerText);
            display.innerText = slicedStr.join("");
            return
        }
        // CALCULATE IF YOU INPUT A SIGN AFTER 2 NUMBERS AND ONE SIGN
        if (operator?.length === 1) {
            evaluate()
            updateDispaly(sign.innerText)
            operator = [sign.innerText]
            return
        }
        updateDispaly(sign.innerText);
        // THIS MAKES ARRAY FOR OPERATOR INPUTED
        makePatterns(false, true);
    })
}

equalSign.addEventListener("click", () => {
    // MAKE IT ONLY AVAILABLE IF RQUIERMENTS ARE MET
    if (nums.length === 2 && operator.length === 1) {
        evaluate();
    }
})

buttonAC.addEventListener("click", AC);

dot.addEventListener("click", () => updateDispaly(dot.innerText));

c.addEventListener("click", () => {
    C();
    makePatterns(true, true);
})

document.querySelector("body").addEventListener("keypress", isNumberKey)
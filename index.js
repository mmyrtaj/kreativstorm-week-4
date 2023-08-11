const display = document.getElementById('display'),
      buttons = document.querySelectorAll('button');
let displayValue = 0,
    num1 = null,
    num2 = null,
    operator = null,
    computed = false,
    operating;

const add = (num1, num2) => num1 + num2;

const substract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => {
    if (num2 == 0) {
        return 'NOT ALLOWED!';
    } else {
        return num1 / num2;
    }
};

const operate = (func, num1, num2) => func(num1, num2);

const updateDisplay = () => {
    display.innerText = displayValue;
};

const handleOperandClick = e => {
    operand(e.target.innerText);
    updateDisplay();
};

const handleOperatorClick = e => {
    document.querySelectorAll('.active').forEach(element => element.classList.remove('active'));
    e.target.classList.add('active');
    operatorInit(e.target.innerText);
    updateDisplay();
};

const handleAcClick = () => {
    document.querySelectorAll('.active').forEach(element => element.classList.remove('active'));
    allClear();
};

const handleBackspaceClick = () => {
    if (displayValue.toString().length == 1) {
        displayValue = 0;
    } else {
        displayValue = backspace(displayValue);
    }
    updateDisplay();
};

const handleDecimalClick = () => {
    addFloatingPoint();
    updateDisplay();
};

const handleEqualClick = () => {
    document.querySelectorAll('.active').forEach(element => element.classList.remove('active'));
    equals();
    updateDisplay();
};

const initialize = () => {
    buttons.forEach((button) => {
        if (button.classList.contains('operand')) {
            button.addEventListener('click', handleOperandClick);
        } else if(button.classList.contains('operator')) {
            button.addEventListener('click', handleOperatorClick);
        } else if (button.id == 'btn-ac') {
            button.addEventListener('click', handleAcClick);
        } else if (button.id == 'backspace') {
            button.addEventListener('click', handleBackspaceClick);
         } else if (button.classList.contains('decimal')) {
            button.addEventListener('click', handleDecimalClick);
        } else if (button.id == 'btn-equal') {
            button.addEventListener('click', handleEqualClick);
        }
    })
};

const operand = (num) => {
    if(computed === true || operating === true){
        displayValue = num;
        computed = false;
        operating = false;
    } else {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = num;
        } else{
            displayValue += displayValue.length > 10 ? '' : num;
        }
    }
};

const backspace = (numInString) => {
    computed = false;
    return numInString.slice(0, -1);
}

const addFloatingPoint = () => {
    if(computed === true){
        displayValue = '0.';
        computed = false;
    } else {
        if (displayValue == 0) {
            displayValue += '.';
        } else if (!displayValue.includes('.')) {
            displayValue += '.';
        }
    }
};

const operationDefiner = operatorText =>{
    computed = false;
    switch (operatorText) {
        case '/':
            return divide
        case '\u00D7':
            return multiply
        case '\u2212':
            return substract
        case '+':
            return add
    }
};

const operatorInit = operatorText => {
    if (operator === null) {
        operator = operationDefiner(operatorText);
        num1 = parseFloat(displayValue);
        displayValue = 0;
    } else {
        num2 = parseFloat(displayValue);
        num1 = operate(operator, num1, num2);
        displayValue = num1;
        operating = true;
        if (num1 == 'NOT ALLOWED!') handleDivByZero();
        operator = operationDefiner(operatorText);
    }
};
const equals = () => {
    if (operator != null) {
        num2 = parseFloat(displayValue);
        num1 = operate(operator, num1, num2);
        displayValue = "" + num1;
        operator = null;
        computed = true;
        if (num1 == 'NOT ALLOWED!') handleDivByZero();
    }
};

const handleDivByZero = () => {
    displayValue = 'NOT ALLOWED!';
    updateDisplay();   
    setTimeout(() =>{
        allClear(); 
    }, 2000);
};

const allClear = () => {
    displayValue = 0;
    num1 = null;
    num2 = null;
    operator = null;
    computed = false;
    updateDisplay();
};

initialize();

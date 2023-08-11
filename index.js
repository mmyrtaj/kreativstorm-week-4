const display = document.getElementById('display'),
      buttons = document.querySelectorAll('button');
let displayValue = 0,
    num1 = null,
    num2 = null,
    operator = null,
    computed = false;

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

const initialize = () => {
    buttons.forEach((button) => {
        if (button.classList.contains('operand')) {
            button.addEventListener('click', () => {
                operand(button.innerText);
                updateDisplay();
            });
        } else if(button.classList.contains('operator')) {
            button.addEventListener('click', () => {
                operatorInit(button);
                updateDisplay();
            });
        } else if (button.id == 'btn-ac') {
            button.addEventListener('click', () => {
                allClear();
            });
        } else if (button.id == 'backspace') {
            button.addEventListener('click', () => {
                if (displayValue.toString().length == 1) {
                    displayValue = 0;
                } else {
                    displayValue = backspace(displayValue);
                }
                updateDisplay();
            });
         } else if (button.classList.contains('decimal')) {
            button.addEventListener('click', () => {
                addFloatingPoint();
                updateDisplay();
            });
        } else if (button.id == 'btn-equal') {
            button.addEventListener('click', () => {
                equals();
                updateDisplay();
            });
        }
    })
};

const operand = (num) => {
    if(computed === true){
        displayValue = num;
        computed = false;
    } else {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = num;
        } else{
            displayValue += num;
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

const operationDefiner = (btnClass) =>{
    computed = false;
    switch (true) {
        case btnClass.contains('btn-divide'):
            return divide
        case btnClass.contains('btn-multiply'):
            return multiply
        case btnClass.contains('btn-minus'):
            return substract
        case btnClass.contains('btn-plus'):
            return add
    }
};

const operatorInit = (button) => {
    if (operator === null) {
        operator = operationDefiner(button.classList);
        num1 = parseFloat(displayValue);
        displayValue = 0;
    } else {
        num2 = parseFloat(displayValue);
        num1 = operate(operator, num1, num2);
        displayValue = 0;
        if (num1 == 'NOT ALLOWED!') handleDivByZero();
        operator = operationDefiner(button.classList);
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

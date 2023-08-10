const display = document.getElementById('display'),
      buttons = document.querySelectorAll('button');
var displayValue = 0,
    num1 = null,
    num2 = null,
    operator1 = null,
    operator2 = null;

const add = (num1, num2) =>  num1 + num2;

const substract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) =>{
    if(num2 == 0){
        return 'NOT ALLOWED!'
    }else{
        return num1 / num2;
    }
};

const operate = (func, num1, num2) => func(num1, num2);

const updateDisplay = () =>{
    display.innerText = displayValue;
}

const initialize = () =>{
    buttons.forEach((button) =>{
        if(button.classList.contains('operand')){
            button.addEventListener('click', () => {
                operand(button.innerText);
                updateDisplay();
            });
        }else if(button.classList.contains('operator')){
            button.addEventListener('click', () => {
                console.log("Clicked operator");
            });
        }else if(button.id == 'btn-ac'){
            button.addEventListener('click', () => {
                console.log("Clicked AC");
            });
        }else if(button.id == 'backspace'){
            button.addEventListener('click', () => {
                if(displayValue.toString().length == 1){
                    displayValue = 0;
                }else{
                    displayValue = backspace(displayValue);
                }
                updateDisplay();
            });
        }else if(button.classList.contains('decimal')){
            button.addEventListener('click', () => {
                console.log("Clicked .");
            });
        }else if(button.id == 'btn-equal'){
            button.addEventListener('click', () => {
                console.log("Clicked =");
            });
        }
    })
}

const operand = (num) =>{
    if(num1 == null){
        if(displayValue == 0){
            displayValue = num;
        }else{
            displayValue += num;
        }
    }else{
        if(displayValue == firstOperand || displayValue == 0) {
            displayValue = num;
        }else{
            displayValue += num;
        }
    }
} ;

const backspace = (numInString) => numInString.slice(0, -1);

initialize();
const add = (num1, num2) =>  num1 + num2;

const substract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) =>{
    if(num2 == 0){
        return 'NOT ALLOWED!'
    } else {
        return num1 / num2;
    }
};
const operate = (func, num1, num2) => func(num1, num2);
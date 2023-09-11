class Calculator{
        constructor(previousOperandTextElement, currentOperandTextElement){
            this.previousOperandTextElement = previousOperandTextElement;
            this.currentOperandTextElement = currentOperandTextElement;
            this.clear();
        }

        clear(){
            this.currentOperand = " ";
            this.previousOperand =" ";
            this.operator = undefined;

        }

        appendNumber(number){
            if(number=== "." && this.currentOperand.includes(".")) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }

        chooseOperartion(operator){
            if(this.currentOperand.includes(operator))return;
            if(this.currentOperand ===" ") return;
            if (this.previousOperand !== " "){
                calculator.compute();
            }
            this.operator = operator;
            if(this.operator === "1/x"){
                let x = this.currentOperand;
                calculator.compute(); 
                this.previousOperand = "1/" + "(" + x + ")";
            }
            else if(this.operator === "x²"){
                let x = this.currentOperand;
                calculator.compute();
                this.previousOperand = "(" + x + ")²";
            }else if(this.operator === "%" ){
                let x = this.currentOperand;
                calculator.compute();
                this.previousOperand = "(" + x + "/100)";
            }else if (this.operator === "√x" ){
                let x = this.currentOperand;
                calculator.compute();
                this.previousOperand = "(√" + x + ")";
            }else if (this.operator === "+/-"){
                let x = this.currentOperand;
                calculator.compute();
                this.previousOperand = x +  "x(-1)";
            }
            else{
            this.previousOperand = this.currentOperand.toString() + operator.toString();
            this.currentOperand = " ";
            }
           }
        

        compute() {
            let computation;
            var current = parseFloat(this.currentOperand);
            var previous = parseFloat(this.previousOperand);
            switch(this.operator){
                case "+":
                    computation = previous + current;
                break;

                case "-":
                    computation = previous - current;
                break;

                case "x":
                    computation = previous * current;
                break;

                case "÷":
                    computation = previous / current;
                break;

                case "√x":
                    computation = Math.sqrt(current);
                break;

                case "x²":
                    computation = Math.pow(current,2);
                break;

                case "1/x":
                    let x = current;
                    computation = 1/x;
                break;

                case "%":
                    computation = current/100;
                break;

                case "+/-":
                    computation = current * (-1);
                    break;

                default:
                    return;
            }
            this.currentOperand = computation.toString();
            this.previousOperand = " ";
            this.operator = undefined;
        }

    delete(){
            this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText= this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;

    }
}

var number_buttons = document.querySelectorAll("[data-number]");
var operators = document.querySelectorAll("[data-operator]");
var backspace = document.querySelector("[data-delete]");
var allclear = document.querySelector("[data-allclear]");
var equal = document.querySelector("[data-equal]");
var previousOperandTextElement = document.querySelector("[data-previousOperandTextElement]");
var currentOperandTextElement = document.querySelector("[data-currentOperandTextElement]");


var calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

for(i=0;i<number_buttons.length;i++){
    number_buttons[i].addEventListener("click",
    function(){
        calculator.appendNumber(this.innerText);
        calculator.updateDisplay();
    }) 
}


for(i=0;i<operators.length;i++){
    operators[i].addEventListener("click",
    function(){
        calculator.chooseOperartion(this.innerText);
        calculator.updateDisplay();
    }) 
}

equal.addEventListener("click",
function(){
    calculator.compute();
    calculator.updateDisplay(); 
})

backspace.addEventListener("click",
function(){
    calculator.delete();
    calculator.updateDisplay();
})

allclear.addEventListener("click",
function(){
    calculator.clear();
    calculator.updateDisplay(); 
})

document.addEventListener("keydown", function(event){
    switch(event.key){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
                calculator.appendNumber(event.key);
                calculator.updateDisplay();
        break;
        
        case "+":
            calculator.chooseOperartion("+");
            calculator.updateDisplay();
        break;
        case "-":
            calculator.chooseOperartion("-");
            calculator.updateDisplay();
        break;
        case "*":
            calculator.chooseOperartion("x");
            calculator.updateDisplay();
        break;
        case "/":
            calculator.chooseOperartion("÷");
            calculator.updateDisplay();
        break;
        case "P":
        case "p":    
            calculator.chooseOperartion("%");
            calculator.updateDisplay();
        break;
        case "Q":
        case "q":    
            calculator.chooseOperartion("√x");
            calculator.updateDisplay();
        break;
        case "R":
        case "r":
            calculator.chooseOperartion("1/x");
            calculator.updateDisplay();
        break;
        case "S":
        case "s":    
            calculator.chooseOperartion("x²");
            calculator.updateDisplay();
        break;
        case "T":
        case "t":    
            calculator.chooseOperartion("+/-");
            calculator.updateDisplay();
        break;

        default:
            return;
    }
});

document.addEventListener("keydown", (event)=>{
    switch(event.key){
        case "Backspace":
        case "Delete":
            calculator.delete();
            calculator.updateDisplay();
        break;
        case "Enter":
            calculator.compute();
            calculator.updateDisplay();
        break;
        case "Escape":
            calculator.clear();
            calculator.updateDisplay();
            break;
        default:
            return;
    }
});
const operation = document.querySelector(".operation");
const answer = document.querySelector(".answer")

const one = document.getElementById("one")
const two = document.getElementById("two")
const three = document.getElementById("three")
const four = document.getElementById("four")
const five = document.getElementById("five")
const six = document.getElementById("six")
const seven = document.getElementById("seven")
const eight = document.getElementById("eight")
const nine = document.getElementById("nine")
const ten = document.getElementById("ten")

const plus= document.getElementById("plus")
const minus = document.getElementById("minus")
const division = document.getElementById("division")
const multiply = document.getElementById("multiply")

const sqrt = document.getElementById("sqrt")
const clearall = document.getElementById("clearall")
const sin = document.getElementById("sin")
const xsquare = document.getElementById("xsquare")
const reciprocal = document.getElementById("reciprocal")
const equal = document.getElementById("equal")
const zero = document.getElementById("zero")
const dot = document.getElementById("dot")
const delbtn = document.getElementById("delete")

function addNumber(num) {
  operation.innerHTML += `<span class="num">${num}</span>`;
}

one.addEventListener("click", () => addNumber("1"));
two.addEventListener("click", () => addNumber("2"));
three.addEventListener("click", () => addNumber("3"));
four.addEventListener("click", () => addNumber("4"));
five.addEventListener("click", () => addNumber("5"));
six.addEventListener("click", () => addNumber("6"));
seven.addEventListener("click", () => addNumber("7"));
eight.addEventListener("click", () => addNumber("8"));
nine.addEventListener("click", () => addNumber("9"));
zero.addEventListener("click", () => addNumber("0"));



clearall.addEventListener("click" , () => {
    operation.innerText = ""
    answer.innerText = ""
});

delbtn.addEventListener("click" , () => {
    let a = operation.innerText.slice(0,-1)
    operation.innerText = a
});

sqrt.addEventListener("click", () => {
    if (operation.innerText === "") return;
    let root = Math.sqrt(Number(operation.innerText));
    let rounded = Number(root.toFixed(5));
    answer.innerText = rounded;
});

const operators = ["+","-","*","/"]

function addOperator(op) {
    let text = operation.innerText;
    let lastchar = text[text.length-1]
    
    if (text.length === 0){
    return
    }
    if (operators.includes(lastchar)) {

        operation.innerHTML = operation.innerHTML.replace(
            /<span class="op">[^<]*<\/span>$/,
            ""
        );

        operation.innerHTML += `<span class="op">${op}</span>`;
        return;
    }

    operation.innerHTML += `<span class="op">${op}</span>`;
}
plus.addEventListener("click", () => addOperator("+"));
minus.addEventListener("click", () => addOperator("-"));
multiply.addEventListener("click", () => addOperator("*"));
division.addEventListener("click", () => addOperator("/"));

dot.addEventListener("click", () => {
  let text = operation.innerText;
  let parts = text.split(/[\+\-\*\/]/);
  let lastPart = parts[parts.length - 1];

  if (lastPart.includes(".")) return;

  if (text.length === 0) return;

  operation.innerText += ".";
});
equal.addEventListener("click", () => { 
    let expr = operation.innerText;

    if (expr.length === 0) return;

    let lastChar = expr[expr.length - 1];

    for (let i = 0; i < operators.length; i++) {
        if (lastChar === operators[i]) {
            return;
        }
    }

    try {
        let result = eval(expr);
        operation.innerText = result;   // allow chaining

        let rounded = Number(result.toFixed(5));
        answer.innerText = "="+rounded;
    } catch (err) {
        answer.innerText = "Error";
    }
});

xsquare.addEventListener("click", () => {
    let value;

    if (answer.innerText !== "") {
        value = Number(answer.innerText);
    } else {
        if (operation.innerText === "") return;
        value = Number(operation.innerText);
    }

    if (isNaN(value)) return;

    let result = value * value;
    let rounded = Number(result.toFixed(5));
    answer.innerText = rounded;
    // operation.innerText = "";
});



reciprocal.addEventListener("click", () =>{

    if(operation.innerText === "") return;

    let value = operation.innerText
    value = Number(value)
    
    if (value === 0){
        operation.innerText = ""
        answer.innerText = "Error"
        return;
    }

    let result = 1/value;
    
    let rounded = Number(result.toFixed(5));
    // operation.innerText = result;
    answer.innerText = rounded;

})

sin.addEventListener("click", () => {
    let text = operation.innerText;
    if (text === "") return;

    let parts = text.split(/[\+\-\*\/]/);
    let lastNum = parts[parts.length - 1];

    if (lastNum === "") return;

    let degree = Number(lastNum);
    if (isNaN(degree)) return;

    let radian = degree * (Math.PI / 180);
    let result = Math.sin(radian);

    // operation.innerText = text.slice(0, text.length - lastNum.length) + result;
    let rounded = Number(result.toFixed(5));
    answer.innerText = rounded;

});
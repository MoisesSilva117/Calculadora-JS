"use strict";

let input = document.getElementById('input'),
    number = document.querySelectorAll('.numbers div'),
    operador = document.querySelectorAll('.operators div'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    resultDisplayed = false; // sinalizador para ficar de olho em qual saída é exibida

// adicionando 'click' a botões numéricos
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
        // armazenando a string de entrada atual e seu último caractere nas variáveis - usado posteriormente
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        // se o resultado não for exibido, continue adicionando
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed == true && lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
            // se o resultado for exibido no momento e o usuário pressionou um operador
            // precisamos continuar adicionando à string para a próxima operação
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            // se o resultado for exibido no momento e o usuário pressionou um número
            // precisamos limpar a string de entrada e adicionar a nova entrada para iniciar a nova operação
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}

for (let i = 0; i < operador.length; i++) {
    operador[i].addEventListener("click", function (e) {
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
        // se o último caractere clicado for um operador, substitua-o pelo atualmente pressionado
        if (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
            let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            //se a primeira tecla pressionada for um operador, não faça nada
            console.log("Digite um número primeiro")
        } else {
            // caso contrário, basta adicionar o operador pressionado ao 'input'
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// adicionado 'click' ao botão 'equal'
result.addEventListener("click", function () {
    // esta é a string que estaremos processando, por exemplo. -10+26+33-56*34/23
    let inputString = input.innerHTML;
    // formando uma 'array' de números. por exemplo, para a string acima, será: números = ["10", "26", "33", "56", "34", "23"]
    let numbers = inputString.split(/\+|\-|\×|\÷/g);
    // formando uma 'array' de operadores. para a string acima será: operadores = ["+", "+", "-", "*", "/"]
    // primeiro substituímos todos os números e pontos por uma string vazia e depois dividimos
    let operators = inputString.replace(/[0-9]|\./g, "").split("");
    console.log(inputString)
    console.log(operators)
    console.log(numbers)
    console.log("--------------------------")

    // agora estamos percorrendo o array e fazendo uma operação de cada vez.
    // primeiro divida, depois multiplique, depois subtraia e depois some.
    // à medida que nos movemos, estamos alterando o array original de números e operadores.
    // o elemento final restante na array será a saída.

    // dividindo
    let divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");

    }
    // multiplicando
    let multiply = operators.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operators.splice(multiply, 1);
      multiply = operators.indexOf("×");
    }
    // subtraindo
    let subtract = operators.indexOf("-")
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-")
    }
    // somando
    let add = operators.indexOf("+");
    while (add != -1) {
        // usar parseFloat é necessário, caso contrário, resultará em concatenação de strings.
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // exibindo a saída

    resultDisplayed = true; // virando a bandeira se o resultado for exibido
});

//botão 'clear'
clear.addEventListener("click", function () {
    input.innerHTML = "";
})
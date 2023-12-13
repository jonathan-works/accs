function calcular(event) {
    event.preventDefault();
    var totalValidado = document.getElementById("total-validado").value;
    var totalConferido = document.getElementById("total-conferido").value;

    if(!totalValidado) {
        alert("Por favor, o campo TOTAL DE CARS VALIDADOS é obrigatório!");
        return;
    }
    if(!totalConferido) {
        alert("Por favor, o campo TOTAL DE CARS A SEREM CONFERIDOS é obrigatório!");
        return;
    }

    var p = totalConferido / totalValidado;
    var q = 1 - p;
    var z = 1.96; // valor de z para um intervalo de confiança de 95%
    var E = 0.05; // margem de erro de 5%
    var n = Math.ceil(Math.pow(z / E, 2) * p * q);

    document.getElementById("resultado").style.display = "block";

    document.querySelector("#resultado .resultado-valor").innerHTML = (p*100).toFixed(2) + "%";
    document.querySelector("#resultado .amostras-valor").innerHTML = n;

    // Gerar lista
    var n = n; // tamanho da lista
    var totalValidado = Math.max(totalValidado); // valor máximo
    var lista = Array.from({ length: n }, () => Math.floor(Math.random() * totalValidado) + 1);
    var lista = lista.sort(function (a, b) {
        return a - b;
    });
    document.getElementById("saida").innerHTML = lista.join(", ");
    return false;
}

function limpar(){
    document.getElementById("total-validado").value = "";
    document.getElementById("total-conferido").value = "";
    document.querySelector("#resultado .resultado-valor").innerHTML = "";
    document.querySelector("#resultado .amostras-valor").innerHTML = "";
    document.getElementById("saida").innerHTML = "";
    document.getElementById("resultado").style.display = "none";
}

function gerarPDF(){
    window.print();
}

function onload(){
    setInterval(() => {
        preloader = document.getElementById("pre-loader")
        if(preloader){
            preloader.style.display = 'none';
        }
        
    }, 2500);
}

var form = document.getElementById("form");
form.addEventListener('submit', calcular);
form.addEventListener('reset', limpar);

var body = document.querySelector('body');
body.addEventListener('load', onload(), false);
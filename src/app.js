import "./css/main.css";
import lottieWeb from "lottie-web";

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./../public', false, /\.(png|jpe?g|svg)$/));
import matoGrosso from './assets/mato-grosso.json';

function calcular(event) {
    event.preventDefault();
    var totalValidado = document.getElementById("total-validado").value;
    var totalConferido = document.getElementById("total-conferido").value;

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
    document.getElementById("data-cricao").innerHTML = obterDataAtualFormatada();

    return false;
}

function obterDataAtualFormatada() {
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');
    const dataFormatada = `${dia}/${mes}/${ano}, às ${horas}:${minutos}:${segundos}`;

    return "Criado em " + dataFormatada;
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
        const preloader = document.getElementById("pre-loader")
        if(preloader){
            preloader.style.display = 'none';
        }
        
    }, 2500);
}

lottieWeb.loadAnimation({
    container: document.getElementById('animation'),
    path: './assets/mato-grosso.json',
    renderer: 'svg',
    loop: false,
    autoplay: true,
    name: "Brasão do Mato Grosso",
});

var form = document.getElementById("form");
form.addEventListener('submit', calcular);
form.addEventListener('reset', limpar);

var body = document.querySelector('body');
body.addEventListener('load', onload(), false);

var btnGerarPdf = document.getElementById('btn-gerar-pdf');
btnGerarPdf.addEventListener('click', gerarPDF);
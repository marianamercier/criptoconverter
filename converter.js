var selectOptions = document.querySelector("#coins")
var selectOptionsMoeda = document.querySelector("#new-coin");
var valorBTC;
var valorETH;
var valorLTC;
var valorRPL;
var valorEUR;
var valorDLR;

var consumirBTC = new XMLHttpRequest();
var consumirETH = new XMLHttpRequest();
var consumirLTC = new XMLHttpRequest();
var consumirRPL = new XMLHttpRequest();
var consumirValorMoedas= new XMLHttpRequest();


// ==================================

//BITCOIN
function sucessBTC() {
    console.log(JSON.parse(this.responseText));
    let valorAtualBitcoin = JSON.parse(this.responseText);
    valorBTC = valorAtualBitcoin.ticker.last;
   

}

function errorBTC(err) {
    console.log('Erro:', err);

}


consumirBTC.onload = sucessBTC;
consumirBTC.onerror = errorBTC;
consumirBTC.open('GET', 'https://www.mercadobitcoin.net/api/BTC/ticker/');
consumirBTC.send();

// ==================================

// ETHEREUM
function sucessETH(){
    console.log(JSON.parse(this.responseText));
    let valorAtualEthereum = JSON.parse(this.responseText);
    valorETH = valorAtualEthereum.ticker.last;

}

function errorETH(err) {
    console.log('Erro:', err);

}

consumirETH.onload = sucessETH;
consumirETH.onerror = errorETH;
consumirETH.open('GET', 'https://www.mercadobitcoin.net/api/ETH/ticker/');
consumirETH.send();

// ========================================

//LITECOIN

function sucessLTC(){
    
    let valorAtualLitecoin = JSON.parse(this.responseText);
    valorLTC = valorAtualLitecoin.ticker.last;

}

function errorLTC(err) {
    console.log('Erro:', err);

}

consumirLTC.onload = sucessLTC;
consumirLTC.onerror = errorLTC;
consumirLTC.open('GET', 'https://www.mercadobitcoin.net/api/LTC/ticker/');
consumirLTC.send();

// =============================================

// RIPPLE
function sucessRPL(){
    
    let valorAtualRipple = JSON.parse(this.responseText);
    valorRPL = valorAtualRipple.ticker.last;

}

function errorRPL(err) {
    console.log('Erro:', err);

}

consumirRPL.onload = sucessRPL;
consumirRPL.onerror = errorRPL;
consumirRPL.open('GET', 'https://www.mercadobitcoin.net/api/XRP/ticker/');
consumirRPL.send();

// ==============================================

function sucessMDS() {
    console.log(JSON.parse(this.responseText));
    let valorMoedas = JSON.parse(this.responseText);
    valorDLR = Number(valorMoedas.USDBRL.bid);
    valorEUR = Number(valorMoedas.EURBRL.bid);


}

function errorMDS(err) {
    console.log('Erro:', err);

}


consumirValorMoedas.onload = sucessMDS;
consumirValorMoedas.onerror = errorMDS;
consumirValorMoedas.open('GET', 'https://economia.awesomeapi.com.br/last/USD,EUR-BRL');
consumirValorMoedas.send();



function converterCriptoParaMoeda(optionCripto,optionMoeda,valor) {

    
    switch (optionCripto) {
        case "Bitcoin":
            if(optionMoeda==="Real")  return (valor * valorBTC);
            else if (optionMoeda==="Dollar") return (valor * valorBTC / valorDLR)
            else return (valor * valorBTC / valorEUR)
            break;
        case "Ehtereum":
            if(optionMoeda==="Real")  return (valor * valorETH);
            else if (optionMoeda==="Dollar") return (valor * valorETH / valorDLR)
            else return (valor * valorETH / valorEUR)
            break;

        case "Litecoin":
            if(optionMoeda==="Real")  return (valor * valorLTC);
            else if (optionMoeda==="Dollar") return (valor * valorLTC / valorDLR)
            else return (valor * valorLTC / valorEUR)
            break;

        case "Ripple":
            if(optionMoeda==="Real")  return (valor * valorRPL);
            else if (optionMoeda==="Dollar") return (valor * valorRPL / valorDLR)
            else return (valor * valorRPL / valorEUR)
            break;
        default:
                        
            break;
    }
}

function verificaOptionsCripto() {
    let options = selectOptions.options[selectOptions.selectedIndex];
    
    return options.value;

}

function verificaOptionsMoeda() {
    let options = selectOptionsMoeda.options[selectOptionsMoeda.selectedIndex];
    
    return options.value;

}


function converter(){

    let campoResultado = document.getElementById("new-value");
    let valor =  Number(document.getElementById("valorUsuario").value);
    let resultado = converterCriptoParaMoeda(verificaOptionsCripto(),verificaOptionsMoeda(),valor);
    console.log(resultado)
    campoResultado.innerHTML = resultado;
}

 document.getElementById("button-convert").addEventListener("click",function(){
   
   let campoResultado = document.getElementById("new-value");
   let valor =  Number(document.getElementById("valorUsuario").value);
   let resultado = converterCriptoParaMoeda(verificaOptionsCripto(),verificaOptionsMoeda(),valor);

   switch (verificaOptionsMoeda()) {
       case "Real":
        campoResultado.innerHTML = resultado.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
           break;
        case "Dollar":
            campoResultado.innerHTML = resultado.toLocaleString('en',{style: 'currency', currency: 'USD'});
            break;

        case "Euro":
            campoResultado.innerHTML = resultado.toLocaleString('en',{style: 'currency', currency: 'EUR'});
         break;
       default:
           break;
   }
    
 })


//Uma função declarada como async significa que o valor de retorno da função será, "por baixo dos panos", uma Promise.

/*const pegarDados = async (dado) => {
    const valor = await fetch(`https://viacep.com.br/ws/${dado}/json/`)
    const newValor = await valor.json();
    console.log(newValor)
    return newValor;
}*/

const meuCep = document.querySelector("#meuCep");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");
const fadeElement = document.querySelector("#fade");

const mostrarValor = async (valor) => {
    const newValor = await getAdress(valor);

    logradouro.value = newValor.logradouro;
    bairro.value = newValor.bairro;
    cidade.value = newValor.localidade;
    estado.value = newValor.uf;
}

meuCep.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode);
    
    //A condição abaixo só permite a inserção de números
    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return
    }    
})

//Função de 
meuCep.addEventListener("keyup", (e) => {
    const inputValor = e.target.value;

    //Chega se temos a quantidade necessária de dígitos
    if(inputValor.length === 8){
        getAddress(inputValor);
    } 
})

//Função chamada quando o usuário digita os 8 dígitos
const getAddress = async (cep) => {
    meuCep.blur();//Tira o foco do cursor de dentro do input 
    const apiUrl = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const resposta = await apiUrl.json();
    console.log(resposta)

    //Mostrar erro e resetar formulario
    if(resposta.erro === "true"){
        document.querySelector("#meuCep").innerHTML = null;
        return;
    }

    logradouro.value = resposta.logradouro;
    bairro.value = resposta.bairro;
    cidade.value = resposta.localidade;
    estado.value = resposta.uf;

}









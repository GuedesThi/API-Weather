const chaveApi = '663fc5da6a1844dcb3d204125232411';
const botaoBusca = document.querySelector('.btn-busca');

botaoBusca.addEventListener('click', async () => {
    const cidadeEscrita = document.getElementById('id-busca').value;
    const dados = await buscarDadosDaCidade(cidadeEscrita);
    preencherDadosNaTela(dados, cidadeEscrita);
})

async function buscarDadosDaCidade(cidade) {
    // PEGUEI ESSA URL NA DOCUMENTAÇÃO DA API
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${chaveApi}&q=${cidade}&aqi=no&lang=pt`
    const chamarApi = await fetch(apiUrl);

    if(chamarApi.status !== 200) {
        const fraseError = `O Local Informado Não Existe`
        document.getElementById('cidade').textContent = fraseError;
        document.getElementById('temperatura').textContent = "";
        document.getElementById('condicao').textContent = "";
        document.getElementById('umidade').textContent = "";
        document.getElementById('velocidade-vento').textContent = "";
    } else {
        const dados = await chamarApi.json();
        return dados;
    }
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const umidade = dados.current.humidity;
    const vento = dados.current.wind_kph;
    const icone = dados.current.condition.icon

    document.getElementById('cidade').textContent = cidade;
    document.getElementById('temperatura').textContent = `${temperatura}ºC`;
    document.getElementById('condicao').textContent = condicao;
    document.getElementById('umidade').textContent = `${umidade}%`;
    document.getElementById('velocidade-vento').textContent = `${vento}km/h`;
    document.getElementById('icone-condicao').setAttribute('src', icone)
}

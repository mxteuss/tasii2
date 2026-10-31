const { suporteN1 } = require('../handlers/suporteHandler')
const chamados = []; 
let n = 0;

function criar(dados){
    console.log("2 -  SERVICE recebeu", dados);
    n = n + 1;
    const chamado = {
        id: n,
        titulo:dados.titulo,
        prioridade: dados.prioridade,
        status:"aberto"
    }
    
    chamado.responsavel = suporteN1(chamado)
    chamados.push(chamado);
    console.log("3 - SERVICE criou", chamado)
    return chamado;
}

function listar(){
    return chamados;
}



 function listarPorId(idBuscado) {
    const chamadoEncontrado = chamados.find(chamado => chamado.id === idBuscado);
    return chamadoEncontrado; 
}


module.exports = { criar, listar, listarPorId};

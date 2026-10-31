const { suporteN1 } = require('../handlers/suporteHandler')
const chamados = []; 
let n = 0;

function criar(dados){
    console.log("2 -  SERVICE recebeu", dados);
    n = n + 1;
    const chamado = {
        id: n,
        cliente:dados.cliente,                
        tipo: dados.tipo,
        valor: dados.valor,
        prioridade: dados.prioridade,   
        status:"recebido"
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

function atualizarParcial(id, dadosNovos) {
    const chamado = chamados.find(c => c.id === id);

    if (!chamado) return null;

    if (chamado.status === "resolvido") {
        throw new Error("Não é permitido modificar um chamado que já foi resolvido."); 
    }

    Object.assign(chamado, dadosNovos);
    return chamado;
}


module.exports = { criar, listar, listarPorId, atualizarParcial };

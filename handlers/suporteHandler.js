function suporteN1(chamado){
    console.log("N1 recebeu o chamado");
    if(chamado.prioridade == "normal"){
        console.log("N1 assumiu o chamado");
        return "Suporte N1";
    }
    console.log("N1 não conseguiu resolver")
    console.log("Encaminhado para N2")
    return suporteN2(chamado);
}

function suporteN2(chamado){
    console.log("N2 recebeu o chamado");
    if(chamado.prioridade == "media"){
        console.log("N2 assumiu o chamado");
        return "Suporte N2";
    }
    console.log("N2 não conseguiu resolver")
    console.log("Encaminhado para N2")
    return especialista(chamado);
}

function especialista(chamado){
    console.log("Especialista recebeu o chamado");
    if(chamado.prioridade == "urgente"){
        console.log("Especialista assumiu o chamado");
        return "Especialista";
    }
  throw new Error("Nenhum responsável encontrado.");
  
}

module.exports = {
    suporteN1
}
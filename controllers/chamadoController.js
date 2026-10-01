const chamadoService = require('../services/chamadoService');

function criar(req, res){
    try{
    console.log("1 - CONTROLLER recebeu", req.body);

    const chamado = chamadoService.criar(req.body)

    res.status(201).json(chamado);
    }catch(error){
        res.status(404).json(error.error)
    }
}

module.exports = { criar } 
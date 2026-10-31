const chamadoService = require('../services/chamadoService');

function criar(req, res) {
    try {
        console.log("1 - CONTROLLER recebeu", req.body);
        const chamado = chamadoService.criar(req.body);
        
        return res.status(201).json(chamado);
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
}

function listar(req, res){
    try{
        const chamados = chamadoService.listar;
        res.status(200).json(chamados)}
        
    catch(error){
       return res.status(404).json({ error: error.message || error });
}
}

module.exports = { criar, listar};
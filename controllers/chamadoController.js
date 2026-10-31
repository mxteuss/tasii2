const chamadoService = require('../services/chamadoService');

function criar(req, res) {
    try {
        const { titulo, prioridade } = req.body;
        if (!titulo || titulo.trim() === "") {
            return res.status(400).json({ 
                error: "O campo 'titulo' é obrigatório e não pode estar em branco." 
            });
        }

        if (!prioridade || prioridade.trim() === "") {
            return res.status(400).json({ 
                error: "O campo 'prioridade' é obrigatório." 
            });
        }


        console.log("1 - CONTROLLER recebeu", req.body);
        const chamado = chamadoService.criar(req.body);

        return res.status(201).json(chamado);
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
}

function listar(req, res){
    try{
        const chamados = chamadoService.listar();
        res.status(200).json(chamados)}
        
    catch(error){
       return res.status(404).json({ error: error.message || error });
}
}

function listarPorId(req, res) {
    try {
        const id = Number(req.params.id); 

        const chamado = chamadoService.listarPorId(id);

        if (!chamado) {
            return res.status(404).json({ error: "Chamado não encontrado." });
        }

        return res.status(200).json(chamado);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar o chamado." });
    }
}


function atualizarParcial(req, res) {
    try {
        const id = Number(req.params.id);
        const dadosNovos = req.body;
        const chamadoAtualizado = chamadoService.atualizarParcial(id, dadosNovos);

        if (!chamadoAtualizado) {
            return res.status(404).json({ error: "Chamado não encontrado para atualização." });
        }

        return res.status(200).json(chamadoAtualizado);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar o chamado." });
    }
}

module.exports = { criar, listar, listarPorId, atualizarParcial };
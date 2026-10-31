const chamadoService = require('../services/chamadoService');

function criar(req, res) {
    try {
        const { cliente, tipo, valor, prioridade } = req.body;

        if (!cliente || cliente.trim() === "") {
            return res.status(400).json({ 
                error: "O campo 'cliente' é obrigatório e não pode estar em branco." 
            });
        }

        if (!tipo || tipo.trim() === "") {
            return res.status(400).json({ 
                error: "O campo 'tipo' é obrigatório e não pode estar em branco." 
            });
        }

        if (!prioridade || prioridade.trim() === "") {
            return res.status(400).json({ 
                error: "O campo 'prioridade' é obrigatório." 
            });
        }

        if (valor === undefined || isNaN(valor) || typeof valor !== 'number' || valor <= 0) {
            return res.status(400).json({
                error: "O valor deve ser numérico e maior que zero."
            });
        }

        console.log("1 - CONTROLLER recebeu", req.body);
        
        const chamado = chamadoService.criar(req.body);

        return res.status(201).json(chamado);

    } catch (error) {
        return res.status(500).json({ 
            error: error.message || "Ocorreu um erro inesperado no servidor." 
        });
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

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: "O ID fornecido na URL deve ser um número inteiro maior que zero." });
        }

        const { cliente, prioridade, status, tipo, valor } = req.body;
        const dadosParaAtualizar = {};

        if (cliente !== undefined) {
            if (cliente.trim() === "") return res.status(400).json({ error: "O título não pode ser vazio." });
            dadosParaAtualizar.titulo = titulo;
        }
        
        if (valor !== undefined) {
            if (typeof valor !== 'number' || valor <= 0) return res.status(400).json({ error: "O valor deve ser numérico e maior que zero." });
            dadosParaAtualizar.valor = valor;
        }

        const chamadoAtualizado = chamadoService.atualizarParcial(id, dadosParaAtualizar);

        if (!chamadoAtualizado) {
            return res.status(404).json({ error: "Identificador inexistente. Chamado não encontrado." });
        }

        return res.status(200).json(chamadoAtualizado);
    } catch (error) {
        return res.status(500).json({ error: "Ocorreu um erro interno inesperado ao processar sua requisição." });
    }
}

module.exports = { criar, listar, listarPorId, atualizarParcial };
const express = require('express');
const chamadoController = require('../controllers/chamadoController')

const router = express.Router();

router.post('/pedidos', chamadoController.criar);
router.get('/pedidos', chamadoController.listar)
router.get('/pedidos/:id', chamadoController.listarPorId);
router.patch('/pedidos/:id/status', chamadoController.atualizarParcial);

module.exports = router;


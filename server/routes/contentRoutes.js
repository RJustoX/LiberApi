const express = require('express');
const router = express.Router();
const contentService = require('../service/contentService');

router.get('/vicioCategories/:id', async function (req, res) {
    const categorias = await contentService.getVicioCategories(req.params.id);
    res.json(categorias);
});

router.get('/vicioReasons/:id', async function (req, res) {
    const motivos = await contentService.getVicioReasons(req.params.id);
    res.json(motivos);
});


module.exports = router;
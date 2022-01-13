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

router.get('/getVicioReports/:id', async function (req, res) {
    const reports = await contentService.getVicioReports(req.params.id);
    res.json(reports);
});

router.get('/getVicioTips/:id', async function (req, res) {
    const tips = await contentService.getVicioTips(req.params.id);
    res.json(tips);
});

router.put('/newTip', async function (req, res) {
    console.log(req.body);
    const result = await contentService.insertReport(req.body);
    console.log(result);
    res.json(result);
});

router.put('/newReport', async function (req, res) {
    console.log(req.body);
    const result = await contentService.insertReport(req.body);
    console.log(result);
    res.json(result);
});


module.exports = router;
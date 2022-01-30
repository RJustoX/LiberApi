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
    const reports = await contentService.getVicioReports(req.params.id, req.headers.userid);
    res.json(reports);
});

router.get('/getVicioTips/:id', async function (req, res) {
    const tips = await contentService.getVicioTips(req.params.id, req.headers.userid);
    res.json(tips);
});

router.put('/newReport', async function (req, res) {
    console.log(req.body);
    const result = await contentService.insertReport(req.body);
    res.json(result);
});

router.put('/newTip', async function (req, res) {
    console.log(req.body);
    const result = await contentService.insertTip(req.body);
    res.json(result);
});

router.delete('/deleteContent/:id', async function (req, res) {
    console.log(req.params.id);
    const result = await contentService.deleteContent(req.params.id);
    res.json(result);
});

router.put('/like', async function (req, res) {
    console.log(req.body);
    const result = await contentService.likeContent(req.body);
    res.json(result);
});


module.exports = router;
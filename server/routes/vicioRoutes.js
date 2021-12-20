const express = require('express');
const router = express.Router();
const vicioService = require('../service/vicioService');

router.get('/vicios', async function (req, res) {
    const vicios = (await vicioService.getAllVicios()).rows;
    res.json(vicios);
});

router.get('/vicios/:id', async function (req, res) {
    const vicios = await vicioService.getUserVicios(req.params.id);
    console.log(vicios);
    res.json(vicios);
});

router.get('/getVicio', async function (req, res) {
    const vicio = (await vicioService.getVicio(req.body.vicioId, req.body.userId)).rows[0];
    res.json(vicio);
});


module.exports = router;
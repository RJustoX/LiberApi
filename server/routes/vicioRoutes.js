const express = require('express');
const router = express.Router();
const vicioService = require('../service/vicioService');

router.get('/vicios', async function (req, res) {
    const vicios = await (await vicioService.getAllVicios()).rows;
    res.json(vicios);
});


module.exports = router;
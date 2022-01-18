const express = require('express');
const router = express.Router();
const rankingService = require('../service/rankingService');

router.get('/ranking/allTime/:id', async function (req, res) {
    const result = await rankingService.getAllTime(req.params.id);
    res.json(result);
});

router.post('/ranking/userPosition', async function (req, res) {
    console.log(req.body)
    const result = await rankingService.getUserPosition(req.body);
    console.log(result);
    res.json(result);
});

module.exports = router;
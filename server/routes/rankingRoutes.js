const express = require('express');
const router = express.Router();
const rankingService = require('../service/rankingService');

router.get('/ranking/allTime/:id', async function (req, res) { 
    const result = await rankingService.getAllTime(req.params.id);
    res.json(result);
});

module.exports = router;
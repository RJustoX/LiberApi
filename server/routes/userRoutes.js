const express = require('express');
const router = express.Router();
const userService = require('../service/userService');


router.get('/users', async function (req, res) {
    const users = await userService.getUsers();
    res.json(users);

});

router.get('/user/:id', async function (req, res) {
    const user = await userService.getUser(req.params.id);
    res.json(user.rows);
});

router.get('/user/login', async function (req, res) {

});

module.exports = router;
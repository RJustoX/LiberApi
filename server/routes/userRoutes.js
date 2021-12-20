const express = require('express');
const router = express.Router();
const userService = require('../service/userService');


router.get('/users', async function (req, res) {
    const users = await userService.getUsers();
    res.json(users);
});

router.get('/user/:id', async function (req, res) {
    const user = await userService.getUser(req.params.id);
    res.json(user.rows[0]);
});

router.post('/login', async function (req, res) {
    const { email, password } = req.body;
    const userId = await userService.postLogin(email, password);

    res.json(userId.rows[0]['id_usuario']);
});

router.post('/logon', async function (req, res) {
    const result = await userService.createNewUser(req.body);
    res.json(result);
});

router.put('/finishLogon', async function (req, res) {
    const result = await userService.finishLogon(req.body);
    console.log(result);
    res.json(result);
});

module.exports = router;
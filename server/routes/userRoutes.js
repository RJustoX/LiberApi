const express = require('express');
const router = express.Router();
const userService = require('../service/userService');


router.get('/users', async function (req, res) {
    const users = await userService.getUsers();
    res.json(users);
});

router.get('/user/:id', async function (req, res) {
    const user = await userService.getUser(req.params.id);
    console.log(user.rows[0]);
    res.json(user.rows[0]);
});

router.post('/login', async function (req, res) {
    const { email, password } = req.body;
    const result = await userService.postLogin(email, password);
    console.log(result);
    res.json(result.id['id_usuario']);
});

router.post('/logon', async function (req, res) {
    const result = await userService.createNewUser(req.body);
    res.json(result);
});

router.put('/finishLogon', async function (req, res) {
    console.log(req.body);
    const result = await userService.finishLogon(req.body);
    console.log(result);
    res.json(result);
});

router.put('/changeAvatar', async function (req, res) {
    const result = await userService.changeAvatar(req.body);
    console.log(result);
    res.json(result);
});

router.put('/updateUser', async function (req, res) {
    console.log(req.body);
    const result = await userService.updateUserData(req.body);
    console.log(result);
    res.json(result);
});


router.post('/insertNewVicio', async function (req, res) {
    const result = await userService.insertNewVicio(req.body);
    console.log(result);
    res.json(result);
});

router.get('/goals/:id', async function (req, res) {
    const result = await userService.getUserGoals(req.params.id);
    res.json(result);
});

router.put('/newGoal', async function (req, res) {
    console.log(req.body);
    const result = await userService.insertGoal(req.body);
    console.log(result);
    res.json(result);
});

router.get('/deleteGoal/:id', async function (req, res) {
    console.log(req.params.id);
    const result = await userService.deleteGoal(req.params.id);
    console.log(result);
    res.json(result);
});

router.put('/editGoal', async function (req, res) {
    console.log(req.body);
    const result = await userService.editGoal(req.body);
    console.log(result);
    res.json(result);
});

module.exports = router;
const database = require('../infra/database');

exports.getUsers = function () {
    return database.query("SELECT * FROM Tb_Usuario");
}
exports.getUser = function (userId) {
    return database.query(`SELECT * FROM tb_usuario WHERE id_usuario = ${userId}`);
}

exports.postLogin = async function (email, password) {
    return await database.query(`SELECT id_usuario from Tb_Usuario WHERE ds_email = '${email}' AND ds_senha = '${password}'`);
}

exports.checkEmail = async function (email) {
    return await database.query(`SELECT id_usuario from tb_usuario WHERE ds_email = '${email}'`);
}

exports.insertUser = async function (user) {
    await database.query(`INSERT INTO tb_usuario(id_usuario, nm_usuario, ds_email, ds_nickname, ds_senha) VALUES (nextval('sq_usuario'),
    '${user.name}','${user.email}','${user.nickname}','${user.password}')`);
}

exports.getNextId = async function () {
    return await database.query("SELECT currval('sq_usuario')");
}
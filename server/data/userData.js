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
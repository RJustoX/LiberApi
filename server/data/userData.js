const database = require('../infra/database');

exports.getUsers = function () {
    return database.query("select * from Tb_Usuario");
}
exports.getUser = function (userId) {
    return database.query(`select * from tb_usuario where id_usuario = ${userId}`);
}
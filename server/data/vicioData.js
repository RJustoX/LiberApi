const database = require('../infra/database');

exports.getAllVicios = function () {
    return database.query('SELECT * FROM Tb_Vicio');
}

exports.getVicio = async function (vicioId) {
    return await database.query(`SELECT * FROM tb_vicio WHERE id_vicio = '${vicioId}'`);
}

exports.getVicioScore = async function (vicioId, userId) {
    return await database.query(`SELECT nu_pontuacao FROM tb_usuario_vicio WHERE id_vicio = '${vicioId}' AND id_usuario = '${userId}'`);
}

exports.getUserVicios = async function (userId) {
    return await database.query(`SELECT * from tb_usuario_vicio WHERE id_usuario = '${userId}'`);
}
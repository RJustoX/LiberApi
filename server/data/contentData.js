const database = require('../infra/database');

exports.getVicioCategories = async function (vicioId) {
    return await database.query(`SELECT * FROM tb_categoria a, tb_categoria_vicio b WHERE b.id_vicio = '${vicioId}'  and a.id_categoria = b.id_categoria`);
};

exports.getVicioReasons = async function (vicioId) {
    return await database.query(`SELECT * FROM tb_motivo a, tb_motivo_vicio b WHERE b.id_vicio = '${vicioId}'  and a.id_motivo = b.id_motivo`);
};
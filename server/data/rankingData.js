const database = require('../infra/database');

exports.getAllTime = async function (vicioId) {
    return await database.query(`SELECT a.id_usuario, a.ds_nickname, b.nu_pontuacao, a.nm_avatar
FROM tb_usuario a, tb_usuario_vicio b WHERE b.id_vicio = '${vicioId}' AND a.id_usuario = b.id_usuario 
ORDER BY b.nu_pontuacao desc`);
}
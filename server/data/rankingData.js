const database = require('../infra/database');

exports.getAllTime = async function (vicioId) {
    return await database.query(`SELECT a.id_usuario, a.ds_nickname, b.nu_pontuacao, a.nm_avatar
FROM tb_usuario a, tb_usuario_vicio b WHERE b.id_vicio = '${vicioId}' AND a.id_usuario = b.id_usuario 
ORDER BY b.nu_pontuacao desc`);
}

exports.getUserPosition = async function (userId, vicioId) {
    return await database.query(`SELECT id_usuario,id_vicio, nu_pontuacao, posicao
FROM ( select id_usuario, id_vicio, nu_pontuacao, ROW_NUMBER() OVER(ORDER BY nu_pontuacao desc) as posicao 
from tb_usuario_vicio where id_vicio = '${vicioId}') x
where x.id_usuario = '${userId}'`);
}
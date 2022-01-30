const database = require('../infra/database');

exports.getVicioCategories = async function (vicioId) {
    return await database.query(`SELECT * FROM tb_categoria a, tb_categoria_vicio b WHERE b.id_vicio = '${vicioId}'  and a.id_categoria = b.id_categoria`);
};

exports.getVicioReasons = async function (vicioId) {
    return await database.query(`SELECT * FROM tb_motivo a, tb_motivo_vicio b WHERE b.id_vicio = '${vicioId}'  and a.id_motivo = b.id_motivo`);
};

exports.getUserData = async function (id) {
    return await database.query(`SELECT id_usuario, nm_avatar, ds_nickname from tb_usuario where id_usuario = '${id}'`)
}

exports.getReports = async function (vicioId) {
    return await database.query(`SELECT * FROM tb_conteudo where id_vicio = '${vicioId}' and fl_dica = false`);
}

exports.getTips = async function (vicioId) {
    return await database.query(`SELECT * FROM tb_conteudo where id_vicio = '${vicioId}' and fl_dica = true`);
}

exports.insertReport = async function (report) {
    await database.query(`INSERT INTO tb_conteudo(id_conteudo, id_usuario, id_vicio, id_motivo, fl_anonimo, fl_dica, ds_relato, nm_titulo)
     values (nextval('sq_conteudo'),'${report.id_usuario}','${report.id_vicio}','${report.id_motivo}','${report.fl_anonimo}','${false}',
     '${report.ds_relato}','${report.nm_titulo}')`);
}

exports.insertTip = async function (report) {
    await database.query(`INSERT INTO tb_conteudo(id_conteudo, id_usuario, id_vicio, id_categoria, fl_anonimo, fl_dica, ds_dica)
     values (nextval('sq_conteudo'),'${report.id_usuario}','${report.id_vicio}','${report.id_categoria}','${report.fl_anonimo}','${true}',
     '${report.ds_dica}')`);
}

exports.getTipByCategory = async function (categoryId, vicioId) {
    return await database.query(`SELECT * FROM tb_conteudo WHERE id_categoria = '${categoryId}' AND id_vicio = '${vicioId}'`);
}

exports.getReportByReason = async function (reasonId, vicioId) {
    return await database.query(`SELECT * FROM tb_conteudo WHERE id_motivo = '${reasonId}' AND id_vicio = '${vicioId}'`);
}

exports.getContentLikes = async function (contentId) {
    return await database.query(`SELECT count(*) FROM tb_likes where id_conteudo = '${contentId}'`);
}

exports.userHasLiked = async function (contentId, userId, vicioId) {
    return await database.query(`SELECT * FROM tb_likes WHERE id_usuario = '${userId}' and id_conteudo = '${contentId}' and id_vicio = '${vicioId}'`);
}

exports.likeContent = async function (contentId, userId, vicioId) {
    return await database.query(`INSERT INTO tb_likes(id_conteudo, id_usuario, id_vicio) Values ('${contentId}', '${userId}', '${vicioId}')`);
}

exports.unlikeContent = async function (contentId, userId, vicioId) {
    return await database.query(`DELETE FROM tb_likes WHERE  id_conteudo = '${contentId}' and id_usuario = '${userId}' and id_vicio = '${vicioId}'`);
}

exports.deleteContent = async function (contentId) {
    await database.query(`DELETE FROM tb_conteudo WHERE id_conteudo = '${contentId}'`);
}

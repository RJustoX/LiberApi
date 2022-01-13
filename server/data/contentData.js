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
    await database.query(`INSERT INTO tb_conteudo(id_conteudo, id_usuario, id_vicio, id_motivo, fl_anonimo, fl_dica, ds_relato, nm_titulo, nu_likes)
     values (nextval('sq_conteudo'),'${report.id_usuario}','${report.id_vicio}','${report.id_motivo}','${report.fl_anonimo}','${false}',
     '${report.ds_relato}','${report.nm_titulo}','${report.nu_likes}')`);
}

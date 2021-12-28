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

exports.updateUserBasicInformation = async function (id, birthdate, sex) {
    await database.query(`UPDATE TB_Usuario set dt_nascimento = '${birthdate}', fl_sexo = '${sex}' WHERE id_usuario = '${id}'`)
}

exports.changeAvatar = async function (id, avatar) {
    await database.query(`UPDATE TB_Usuario SET nm_avatar = '${avatar}' WHERE id_usuario = '${id}'`);
}

exports.insertVicio = async function (userId, vicioId) {
    await database.query(`INSERT INTO TB_Usuario_Vicio values ('${userId}','${vicioId}')`)
}

exports.getNextId = async function () {
    return await database.query("SELECT currval('sq_usuario')");
}

exports.getUserGoals = async function (id) {
    return await database.query(`SELECT * from tb_meta WHERE id_usuario = '${id}'`);
}

exports.insertGoal = async function (goal) {
    await database.query(`INSERT INTO tb_meta(id_meta, id_usuario, nm_meta, vl_meta, fl_ativa, fl_concluida, nu_pontuacao, ds_meta, nm_avatar)
     values (nextval('sq_meta'),'${goal.userId}','${goal.title}','${goal.value}','${goal.active}','${goal.done}',
     '${goal.pontos}','${goal.desc}','${goal.avatar}')`);
}

exports.deleteGoal = async function (goalId) {
    await database.query(`DELETE FROM tb_meta WHERE id_meta = '${goalId}'`);
}
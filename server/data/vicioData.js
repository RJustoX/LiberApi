const database = require('../infra/database');

exports.getAllVicios = function () {
    return database.query('SELECT * FROM Tb_Vicio');
}
const rankingData = require('../data/rankingData');

exports.getAllTime = async function (vicioId) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar o ranking',
        values: [],
    }

    if (vicioId) {
        const users = (await rankingData.getAllTime(vicioId)).rows;


        result.status = 1;
        result.message = 'Ranking carregado com sucesso';
        result.values = users;
    }

    return result;
}

exports.getUserPosition = async function (params) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar a posição do usuário',
    }

    if (params) {
        const user = (await rankingData.getUserPosition(params.userId, params.vicioId)).rows[0];


        result.status = 1;
        result.message = 'Ranking carregado com sucesso';
        result.value = user;
    }

    return result;
}
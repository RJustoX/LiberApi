const rankingData = require('../data/rankingData');

exports.getAllTime = async function (vicioId) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar o ranking',
        values: [],
    }

    if (vicioId) {
        console.log('1');
        const users = (await rankingData.getAllTime(vicioId)).rows;


        result.status = 1;
        result.message = 'Ranking carregado com sucesso';
        result.values = users;
    }

    return result;
}
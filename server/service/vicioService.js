const vicioData = require('../data/vicioData');

exports.getAllVicios = function () {
    return vicioData.getAllVicios();
}

exports.getVicio = async function (vicioId, userId) {
    const vicio = await (await vicioData.getVicio(vicioId)).rows[0];
    vicio.nu_pontuacao = await (await vicioData.getVicioScore(vicioId, userId)).rows[0];
    return vicio;
}

exports.getUserVicios = async function (userId) {
    const result = {
        status: 0,
        message: 'Não foram encontrados vicios',
        values: [],
    }

    if (userId) {
        const vicios = (await vicioData.getUserVicios(userId)).rows;

        for (const vicio of vicios) {
            const data = (await vicioData.getVicio(vicio.id_vicio)).rows[0];
            vicio.nm_vicio = data.nm_vicio;
            vicio.nm_logo = data.nm_logo;
            result.values.push(vicio);
        }
        result.status = 1;
        result.message = 'Vicios encontrados com sucesso';
    }


    return result;
}
const contentData = require('../data/contentData');

exports.getVicioCategories = async function (vicioId) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar as categorias',
    };

    const categories = (await contentData.getVicioCategories(vicioId)).rows;


    if (categories.length > 0) {
        result.status = 1;
        result.message = 'Categorias encontradas com sucesso!'
        result.value = categories;
    }

    return result;
}

exports.getVicioReasons = async function (vicioId) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar os motivos',
    };
    const reasons = (await contentData.getVicioReasons(vicioId)).rows;

    if (reasons.length > 0) {
        result.status = 1;
        result.message = 'Motivos encontrados com sucesso!'
        result.value = reasons;
    }

    return result;
};
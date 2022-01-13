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

exports.getVicioReports = async function (vicioId) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar os relatos',
    };
    const reports = (await contentData.getReports(vicioId)).rows;

    if (reports && reports.length > 0) {

        for (const report of reports) {
            report.user = (await contentData.getUserData(report.id_usuario)).rows;
            if (report.fl_anonimo == true) {
                report.user[0].ds_nickname = 'Anonimo';
                report.user[0].nm_avatar = '';
            }

        }

        result.status = 1;
        result.message = 'Relatos encontrados com sucesso!'
        result.value = reports;
    }

    return result;
};

exports.getVicioTips = async function (vicioId) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar as dicas',
    };
    const tips = (await contentData.getTips(vicioId)).rows;

    if (tips && tips.length > 0) {

        for (const tip of tips) {
            tip.user = (await contentData.getUserData(tip.id_usuario)).rows;
            if (tip.fl_anonimo == true) {
                tip.user[0].ds_nickname = 'Anonimo';
                tip.user[0].nm_avatar = '';
            }

        }

        result.status = 1;
        result.message = 'Dicas encontrados com sucesso!'
        result.value = tips;
    }

    return result;
};

exports.insertReport = async function (report) {
    const result = {
        status: 0,
        message: 'Não foi publicar o relato',
    };

    if (report) {
        console.log(report);
        await contentData.insertReport(report);
        result.status = 1;
        result.message = 'Relato publicado com sucesso';
    }

    return result;
};
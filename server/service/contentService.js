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

exports.getVicioReports = async function (vicioId, userId) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar os relatos',
    };
    const reports = (await contentData.getReports(vicioId)).rows;

    if (reports && reports.length > 0) {

        for (const report of reports) {
            report.user = (await contentData.getUserData(report.id_usuario)).rows;
            let likes = (await contentData.getContentLikes(report.id_conteudo)).rows[0].count;
            let liked = (await contentData.userHasLiked(report.id_conteudo, parseInt(userId), report.id_vicio)).rowCount;
            report.isOwner = report.id_usuario == userId;
            report.liked = liked == 0 ? false : true;
            report.nu_likes = parseInt(likes);
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

exports.getVicioTips = async function (vicioId, userId) {
    const result = {
        status: 0,
        message: 'Não foi possivel carregar as dicas',
    };
    const tips = (await contentData.getTips(vicioId)).rows;

    if (tips && tips.length > 0) {

        for (const tip of tips) {
            tip.user = (await contentData.getUserData(tip.id_usuario)).rows;
            let likes = (await contentData.getContentLikes(tip.id_conteudo)).rows[0].count;
            let liked = (await contentData.userHasLiked(tip.id_conteudo, userId, tip.id_vicio)).rowCount;
            tip.isOwner = tip.id_usuario == userId;
            tip.liked = liked == 0 ? false : true;
            tip.nu_likes = parseInt(likes);
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

exports.likeContent = async function (params) {
    const result = {
        status: 0,
        message: 'Não foi possivel curtir a publicação'
    }

    if (params) {
        if (JSON.parse(params.add)) {
            try {
                await contentData.likeContent(params.content.contentId, params.content.userId, params.content.vicioId);
                result.status = 1;
                result.message = 'Não foi possivel curtir a publicação';
            } catch (error) {
                console.log('Ocorreu um erro');
            }
        } else {
            try {
                await contentData.unlikeContent(params.content.contentId, params.content.userId, params.content.vicioId);
                result.status = 1;
                result.message = 'Não foi possivel descurtir a publicação';
            } catch (error) {
                console.log('Ocorreu um erro');
            }
        }
    }

    return result;
};

exports.insertReport = async function (report) {
    const result = {
        status: 0,
        message: 'Não foi publicar o relato',
    };

    if (report) {
        await contentData.insertReport(report);
        result.status = 1;
        result.message = 'Relato publicado com sucesso';
    }

    return result;
};

exports.insertTip = async function (tip) {
    const result = {
        status: 0,
        message: 'Não foi publicar a dica',
    };

    if (tip) {
        await contentData.insertTip(tip);
        result.status = 1;
        result.message = 'Dica publicada com sucesso';
    }

    return result;
};

exports.deleteContent = async function (idConteudo) {
    const result = {
        status: 0,
        message: 'Não foi possivel excluir o conteúdo',
    };

    if (idConteudo) {
        await contentData.deleteContent(idConteudo);
        result.status = 1;
        result.message = 'Conteúdo excluido com sucesso';
    }

    return result;
};
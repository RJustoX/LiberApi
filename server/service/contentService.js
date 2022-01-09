const contentData = require('../data/contentData');

exports.getVicioCategories = async function (vicioId) {
    return (await contentData.getVicioCategories(vicioId)).rows;
}

exports.getVicioReasons = async function (vicioId) {
    return (await contentData.getVicioReasons(vicioId)).rows;
};
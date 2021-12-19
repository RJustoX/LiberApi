const userData = require('../data/userData');

exports.getUsers = function () {
    return userData.getUsers();
}

exports.getUser = function (userId) {
    return userData.getUser(userId);
}

exports.postLogin = function (email, password) {
    return userData.postLogin(email, password);
}
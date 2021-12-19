const userData = require('../data/userData');

exports.getUsers = function () {
    return userData.getUsers();
}

exports.getUser = function (userId) {
    return userData.getUser(userId);
}
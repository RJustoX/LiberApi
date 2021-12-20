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

exports.createNewUser = async function (user) {
    const result = {
        status: 0,
        message: 'Não foi possivel fazer o cadastro',
    };

    if (user) {

        if (await checkEmail(user.email)) {
            result.message = 'Email já cadastrado';
        } else {
            userData.insertUser(user);
            result.value = (await userData.getNextId()).rows[0]['currval'];
            result.status = 1;
            result.message = 'Usuário cadastrado com sucesso';
        }
    }

    return result;
}

exports.finishLogon = function (user) {
    console.log(user.vicioId);
    if (user) {
        userData.updateUserBasicInformation(user.id, user.birthDate, user.sex);
        userData.insertVicio(user.id, user.vicioId);
    }
    return {
        status: 1,
        message: 'Cadastro finalizado!',
    }
}

async function checkEmail(email) {
    const result = (await userData.checkEmail(email)).rowCount;

    if (!result) {
        return false;
    }

    return true;
}
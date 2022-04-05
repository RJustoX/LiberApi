const userData = require('../data/userData');

exports.getUsers = function () {
    return userData.getUsers();
}

exports.getUser = function (userId) {
    return userData.getUser(userId);
}

exports.postLogin = async function (email, password) {
    const result = {
        status: 0,
        message: 'Usuário não cadastrado'
    };
    user = await userData.postLogin(email, password);
    if (user.rows[0]['id_usuario']) {
        result.status = 1;
        result.message = 'Usuário encontrado';
        result.id = user.rows[0];
    };


    return result;
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
    console.log(user);
    if (user) {
        userData.updateUserBasicInformation(user.id, user.birthDate, user.sex, user.daySave);
        userData.insertVicio(user.id, user.vicioId);
    }
    return {
        status: 1,
        message: 'Cadastro finalizado!',
    }
}

exports.updateUserData = async function (user) {
    console.log(user);
    result = {
        status: 1,
        message: 'Dados atualizados!',
    }

    if (user) {
        try {
            await userData.updateUserData(user);
        } catch (error) {
            result.status = 0;
            result.message = 'Não foi possivel atualizar os dados'
        }
    }
    return result;
}

async function checkEmail(email) {
    const result = (await userData.checkEmail(email)).rowCount;

    if (!result) {
        return false;
    }

    return true;
}


exports.changeAvatar = async function (user) {
    const result = {
        status: 0,
        message: 'Não foi possivel alterar a foto de perfil',
    };

    if (user.id && user.avatar) {
        await userData.changeAvatar(user.id, user.avatar);
        result.status = 1;
        result.message = 'Avatar alterado com sucesso';
    }

    return result;
};

exports.insertNewVicio = async function (user) {
    const result = {
        status: 0,
        message: 'Não foi possivel inserir o vicio',
    };

    if (user.userId && user.vicioId) {
        await userData.insertVicio(user.userId, user.vicioId);
        result.status = 1;
        result.message = 'Vicio inserido com sucesso';
    }

    return result;
};

exports.getUserGoals = async function (id) {
    const result = {
        status: 0,
        message: 'Nenhuma meta cadastrada',
    };

    if (id) {
        goals = await userData.getUserGoals(id);
        if (goals) {
            console.log(goals.rows);
            result.status = 1;
            result.message = 'Metas encontradas com sucesso';
            result.value = goals.rows;
        }
    }

    return result;
};

exports.insertGoal = async function (goal) {
    const result = {
        status: 0,
        message: 'Não foi possivel cadastrar a meta',
    };

    if (goal) {
        console.log(goal);
        await userData.insertGoal(goal);
        result.status = 1;
        result.message = 'Meta cadastrada com sucesso';
    }

    return result;
};

exports.deleteGoal = async function (goalId) {
    const result = {
        status: 0,
        message: 'Não foi possivel excluir a meta',
    };

    if (goalId) {
        await userData.deleteGoal(goalId);
        result.status = 1;
        result.message = 'Meta excluida com sucesso';
    }

    return result;
};

exports.editGoal = async function (goal) {
    const result = {
        status: 0,
        message: 'Não foi possivel editar a meta',
    };

    if (goal) {
        await userData.editGoal(goal);
        result.status = 1;
        result.message = 'Meta alterada com sucesso';
    }

    return result;
};
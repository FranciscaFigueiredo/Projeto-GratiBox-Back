import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userRepository from '../repositories/userRepository.js';

async function authenticateRegistration({ name, email, password }) {
    const hash = bcrypt.hashSync(password, 10);

    const search = await userRepository.findEmail({ email });

    if (search.length) {
        return null;
    }

    const createUser = userRepository.create({ name, email, password: hash });

    return createUser;
}

function generateToken({ userId }) {
    const idUser = userId;
    const key = process.env.JWT_SECRET;
    const config = { expiresIn: 60 * 60 * 24 * 2 }; // 2 dias em segundos

    const token = jwt.sign({ idUser }, key, config);
    return token;
}

async function authenticateLogin({ email, password }) {
    const search = await userRepository.findEmail({ email });

    if (search.length) {
        const userId = search[0].id;

        const compareHashPassword = bcrypt.compareSync(password, search[0].password);

        if (!compareHashPassword) {
            return {
                message: 'Email ou senha inválidos',
                user: null,
                token: null,
            };
        }
        const token = generateToken({ userId });

        return {
            message: 'Usuário encontrado',
            user: search[0],
            token,
        };
    }
    return {
        message: 'Email ou senha inválidos',
        user: null,
        token: null,
    };
}

async function getUserInfo({ userId }) {
    const search = await userRepository.findUser({ userId });

    if (search) {
        return search;
    }

    return false;
}

export {
    authenticateRegistration,
    generateToken,
    authenticateLogin,
    getUserInfo,
};

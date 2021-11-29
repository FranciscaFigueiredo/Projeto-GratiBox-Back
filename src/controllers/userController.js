import { userSchema } from '../validation/signUp.js';
import * as userService from '../services/userService.js';
import { loginSchema } from '../validation/login.js';

async function signUp(req, res) {
    const { name, email, password } = req.body;

    const validate = userSchema.validate({
        name,
        email,
        password,
    });

    if (validate.error) {
        return res.status(400).send(validate.error.message);
    }

    try {
        const registration = await userService.authenticateRegistration({ name, email, password });

        if (registration === null) {
            return res.status(409).send('Email já cadastrado na plataforma');
        }

        return res.status(201).send('Usuário cadastrado com sucesso');
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const validate = loginSchema.validate({
        email,
        password,
    });

    if (validate.error) {
        return res.sendStatus(400);
    }

    try {
        const userLogin = await userService.authenticateLogin({ email, password });

        if (userLogin.user === null) {
            return res.status(401).send('Usuário não cadastrado');
        }

        return res.send(userLogin.token);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    signUp,
    login,
};

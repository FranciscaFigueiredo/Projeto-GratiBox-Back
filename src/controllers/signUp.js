import bcrypt from 'bcrypt';

import { connection } from '../database/database';
import { userSchema } from '../validation/signUp';

async function signUp(req, res) {
    const {
        name,
        email,
        password,
        confirmPassword,
    } = req.body;

    const validate = userSchema.validate({
        name,
        email,
        password,
        confirmPassword,
    });

    if (validate.error) {
        return res.sendStatus(400);
    }

    try {
        const searchUser = await connection.query('SELECT * FROM clients WHERE email = $1;', [email]);
        if (searchUser.rowCount) {
            return res.sendStatus(409);
        }
        const hash = bcrypt.hashSync(password, 10);

        await connection.query(
            `
            INSERT INTO clients 
                (name, email, password) 
            VALUES ($1, $2, $3);`,
            [name, email, hash],
        );

        return res.status(201).send('Usuário cadastrado com sucesso');
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    signUp,
};

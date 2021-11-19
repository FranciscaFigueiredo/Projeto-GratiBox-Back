import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { connection } from '../database/database.js';
import { loginSchema } from '../validation/login.js';

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
        const searchUser = await connection.query(
            'SELECT * FROM clients WHERE email = $1;',
            [email],
        );

        const user = searchUser.rows[0];
        const hashPassword = bcrypt.compareSync(password, user.password);

        if (!user || !hashPassword) {
            return res.status(401).send('Email ou senha inválidos');
        }

        const idUser = user.id;
        const key = process.env.JWT_SECRET;
        const config = { expiresIn: 60 * 60 * 24 * 2 }; // 2 dias em segundos

        const token = jwt.sign({ idUser }, key, config);

        await connection.query('DELETE FROM sessions WHERE client_id = $1;', [idUser]);

        await connection.query(
            `
                INSERT INTO sessions 
                    (client_id, token) 
                VALUES ($1, $2);`,
            [idUser, token],
        );

        return res.status(200).send(token);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export { login };

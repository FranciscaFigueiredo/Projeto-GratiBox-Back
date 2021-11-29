import { connection } from '../database/database.js';

async function findEmail({ email }) {
    const existingUser = await connection.query(
        'SELECT * FROM clients WHERE email = $1;',
        [email],
    );
    return existingUser.rows;
}

async function create({ name, email, password }) {
    try {
        const userCreated = await connection.query(
            'INSERT INTO clients (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
            [name, email, password],
        );

        return userCreated.rows[0];
    } catch (error) {
        return false;
    }
}

async function findUser({ userId }) {
    const userInfo = await connection.query('SELECT name, email FROM clients WHERE id = $1;', [userId]);
    return userInfo.rows[0];
}

export {
    findEmail,
    create,
    findUser,
};

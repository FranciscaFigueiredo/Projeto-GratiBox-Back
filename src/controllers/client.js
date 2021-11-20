import { connection } from '../database/database.js';

async function getUserInfo(req, res) {
    const userId = res.locals.user.idUser;

    try {
        const userInfo = await connection.query('SELECT name, email FROM clients WHERE id = $1;', [userId]);
        const client = userInfo.rows[0];

        return res.status(200).send(client);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    getUserInfo,
};

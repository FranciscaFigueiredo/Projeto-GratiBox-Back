import { connection } from '../database/database.js';

async function getUserPlan(req, res) {
    const userId = res.locals.user.idUser;

    try {
        const planUser = await connection.query('SELECT * FROM subscriptions WHERE client_id = $1;', [userId]);

        return res.status(200).send(planUser.rows);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    getUserPlan,
};

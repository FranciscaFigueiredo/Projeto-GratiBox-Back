import jwt from 'jsonwebtoken';
import { connection } from '../database/database.js';

async function getUserPlan(req, res) {
    const { token } = req.body;
    let userId = null;

    const key = process.env.JWT_SECRET;
    try {
        const validateToken = jwt.verify(token, key);

        userId = validateToken.idUser;
    } catch (error) {
        return res.sendStatus(401);
    }

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

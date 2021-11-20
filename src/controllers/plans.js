import { connection } from '../database/database.js';

async function getPlans(req, res) {
    try {
        const plans = await connection.query('SELECT name, period, price, description FROM plans;');

        return res.status(200).send(plans.rows);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    getPlans,
};

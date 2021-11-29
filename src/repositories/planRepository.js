import { connection } from '../database/database.js';

async function getPlans() {
    try {
        const plans = await connection.query('SELECT name, period, price, description FROM plans;');

        return plans.rows;
    } catch (error) {
        return false;
    }
}

async function getUserPlan({ userId }) {
    try {
        const planUser = await connection.query('SELECT * FROM subscriptions WHERE client_id = $1;', [userId]);

        return planUser.rows;
    } catch (error) {
        return false;
    }
}

async function getPlanByName({ name }) {
    try {
        const planData = await connection.query('SELECT * FROM plans WHERE name = $1;', [name]);

        return planData.rows[0];
    } catch (error) {
        return false;
    }
}

export {
    getPlans,
    getUserPlan,
    getPlanByName,
};

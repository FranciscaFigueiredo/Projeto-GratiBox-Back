import { connection } from '../database/database.js';

async function create({ userId, planId, dateToReceive }) {
    try {
        const subscriptionData = await connection.query(`
            INSERT INTO subscriptions
                (client_id, date_subscription, plan_id, date_receive)
            VALUES
                ($1, now(), $2, $3)
                RETURNING *;
        `, [userId, planId, dateToReceive]);

        return subscriptionData.rows;
    } catch (error) {
        return false;
    }
}

async function createRelationProductSubscription({ subscriptionId, productId }) {
    try {
        const products = await connection.query(`
        INSERT INTO products_subscription
            (subscription_id, product_id)
        VALUES
            ($1, $2)
            RETURNING *;
    `, [subscriptionId, productId]);

        return products.rows;
    } catch (error) {
        return false;
    }
}

export {
    create,
    createRelationProductSubscription,
};

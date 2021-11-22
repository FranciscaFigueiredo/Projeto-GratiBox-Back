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

async function toSign(req, res) {
    const userId = res.locals.user.idUser;

    const {
        plan,
        data,
        products,
    } = req.body;
    let day = 0;
    const {
        name,
    } = plan;

    if (data === 'Segunda') {
        day = 1;
    }
    if (data === 'Terça') {
        day = 2;
    }
    if (data === 'Quarta') {
        day = 3;
    }
    if (data === 'Quinta') {
        day = 4;
    }
    if (data === 'Sexta') {
        day = 5;
    }
    try {
        const planUser = await connection.query('SELECT * FROM subscriptions WHERE client_id = $1;', [userId]);
        const planData = await connection.query('SELECT * FROM plans WHERE name = $1;', [name]);
        if (!planUser.rowCount) {
            await connection.query(`
                INSERT INTO subscriptions
                    (client_id, date_subscription, plan_id, date_receive)
                VALUES
                    ($1, now(), $2, $3);
            `, [userId, planData.rows[0].id, day]);
            const search = await connection.query('SELECT * FROM subscriptions WHERE client_id = $1;', [userId]);
            products.map(async (prod) => {
                const product = await connection.query('SELECT * FROM products WHERE name = $1;', [`${prod}`]);

                await connection.query(`
                INSERT INTO products_subscription
                    (subscription_id, product_id)
                VALUES
                    ($1, $2);
            `, [search.rows[0].id, product.rows[0].id]);
            });
            return res.status(200).send(search.rows);
        }

        return res.sendStatus(409);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    getUserPlan,
    toSign,
};

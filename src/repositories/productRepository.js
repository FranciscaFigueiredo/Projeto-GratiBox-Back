import { connection } from '../database/database.js';

async function getProductInfo({ name }) {
    try {
        const product = await connection.query('SELECT * FROM products WHERE name = $1;', [name]);

        return product.rows[0];
    } catch (error) {
        return false;
    }
}

export {
    getProductInfo,
};

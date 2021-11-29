import { connection } from '../database/database.js';

async function getStates() {
    try {
        const states = await connection.query('SELECT acronym FROM states;');

        return states.rows;
    } catch (error) {
        return false;
    }
}

export {
    getStates,
};

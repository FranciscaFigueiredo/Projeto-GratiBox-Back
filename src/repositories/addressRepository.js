import { connection } from '../database/database.js';

async function listStates() {
    try {
        const states = await connection.query('SELECT acronym FROM states;');

        return states.rows;
    } catch (error) {
        return false;
    }
}

async function getStateByAcronym({ acronym }) {
    try {
        const stateData = await connection.query('SELECT * FROM states WHERE acronym = $1;', [acronym]);

        return stateData.rows[0];
    } catch (error) {
        return false;
    }
}

async function getCityByName({ name }) {
    try {
        const searchCity = await connection.query('SELECT * FROM city WHERE name = $1;', [name]);

        return searchCity.rows[0];
    } catch (error) {
        return false;
    }
}

async function createCity({ name, stateId }) {
    try {
        const cityData = await connection.query('INSERT INTO city (name, state_id) VALUES ($1, $2) RETURNING *;', [name, stateId]);

        return cityData.rows[0];
    } catch (error) {
        return false;
    }
}

async function createAddress({ street, cep, cityId }) {
    try {
        const address = await connection.query(`
        INSERT INTO address
            (street, cep, city_id)
        VALUES
            ($1, $2, $3)
        RETURNING *;
    `, [street, cep, cityId]);

        return address.rows[0];
    } catch (error) {
        return false;
    }
}

export {
    listStates,
    getStateByAcronym,
    getCityByName,
    createCity,
    createAddress,
};

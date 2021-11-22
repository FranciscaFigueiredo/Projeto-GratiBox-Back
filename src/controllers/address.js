import { connection } from '../database/database.js';

async function getStates(req, res) {
    try {
        const states = await connection.query('SELECT acronym FROM states;');
        return res.status(200).send(states.rows);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function postAddress(req, res) {
    const userId = res.locals.user.idUser;

    const {
        street,
        cep,
        city,
        state,
    } = req.body;

    try {
        const searchCity = await connection.query('SELECT * FROM city WHERE name = $1;', [city]);

        const stateData = await connection.query('SELECT * FROM states WHERE acronym = $1;', [state]);
        let cityData;

        if (!searchCity.rowCount) {
            cityData = await connection.query('INSERT INTO city (name, state_id) VALUES ($1, $2);', [city, stateData.rows[0].id]);
        }

        if (searchCity.rowCount) {
            cityData = searchCity.rows;
        }

        await connection.query(`
            INSERT INTO address
                (street, cep, city_id)
            VALUES
                ($1, $2, $3);
        `, [street, cep, cityData[0].id]);

        const address = await connection.query('SELECT * FROM address WHERE city_id = $1;', [cityData[0].id]);

        await connection.query(`
            UPDATE clients
            SET address_id = $1
            WHERE id = $2;
        `, [address.rows[0].id, userId]);

        return res.status(200).send(address.rows);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    getStates,
    postAddress,
};

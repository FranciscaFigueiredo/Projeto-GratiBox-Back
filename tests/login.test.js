import '../src/setup.js';
import supertest from 'supertest';
import { connection } from '../src/database/database.js';
import { app } from '../src/app.js';
import {
    validBodyFactorySignUp,
} from '../src/factories/signUp.factory.js';
import {
    validBodyFactoryLogin,
    invalidBodyFactoryLogin,
} from '../src/factories/login.factory.js';

beforeAll(async () => {
    const {
        name,
        email,
        password,
    } = validBodyFactorySignUp();

    await connection.query(
        `
        INSERT INTO clients 
            (name, email, password) 
        VALUES ($1, $2, $3);`,
        [name, email, password],
    );
});

afterAll(async () => {
    await connection.query('DELETE FROM clients;');
    connection.end();
});

describe('POST /login', () => {
    async function getClient() {
        const validBody = await connection.query(`
            SELECT * FROM clients;
        `);

        return validBody;
    }

    let body = getClient();
    body = body.rows[0].id;

    const invalidBody = invalidBodyFactoryLogin();
    const invalidUser = validBodyFactoryLogin();

    test('returns 400 for invalid body', async () => {
        const result = await supertest(app).post('/login').send(invalidBody);

        expect(result.status).toEqual(400);
    });

    test('returns 401 for invalid user data', async () => {
        const result = await supertest(app).post('/login').send(invalidUser);

        expect(result.status).toEqual(401);
    });

    test('returns 200 for valid body', async () => {
        const result = await supertest(app).post('/login').send(body);

        expect(result.status).toEqual(200);
    });
});

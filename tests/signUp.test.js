import '../src/setup.js';
import supertest from 'supertest';
import { connection } from '../src/database/database.js';
import { app } from '../src/app.js';
import {
    validBodyFactorySignUp,
    invalidBodyFactorySignUp,
} from '../src/factories/signUp.factory.js';

afterAll(async () => {
    await connection.query('DELETE FROM clients;');
    connection.end();
});

describe('POST /sign-up', () => {
    const validBody = validBodyFactorySignUp();
    const invalidBody = invalidBodyFactorySignUp();

    test('returns 400 for invalid body', async () => {
        const result = await supertest(app).post('/sign-up').send(invalidBody);

        expect(result.status).toEqual(400);
    });

    test('returns 201 for valid body', async () => {
        const result = await supertest(app).post('/sign-up').send(validBody);

        expect(result.status).toEqual(201);
    });
});

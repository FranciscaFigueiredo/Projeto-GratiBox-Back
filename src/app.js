import express from 'express';
import cors from 'cors';

import { signUp } from './controllers/signUp.js';
import { login } from './controllers/login.js';
import { getUserPlan } from './controllers/subscriptions.js';
import { auth } from './middlewares/auth.js';
import { getUserInfo } from './controllers/client.js';
import { getPlans } from './controllers/plans.js';

const app = express();
app.use(cors());
app.use(express.json());

// ------ SIGN-UP ------
app.post('/sign-up', signUp);

// ------ LOGIN ------
app.post('/login', login);

// ------ PLANS ------
app.get('/plan', auth, getUserPlan);
app.get('/plan-types', auth, getPlans);

// ------ CLIENT ------
app.get('/user-info', auth, getUserInfo);

export {
    app,
};

import express from 'express';
import cors from 'cors';

import { toSign } from './controllers/subscriptions.js';
import { auth } from './middlewares/auth.js';
import { getUserInfo } from './controllers/client.js';
import { getStates, postAddress } from './controllers/address.js';

import * as userController from './controllers/userController.js';
import * as planController from './controllers/planController.js';

const app = express();
app.use(cors());
app.use(express.json());

// ------ SIGN-UP ------
app.post('/sign-up', userController.signUp);

// ------ LOGIN ------
app.post('/login', userController.login);

// ------ PLANS ------
app.get('/plan', auth, planController.getUserPlan);
app.get('/plan-types', auth, planController.getPlans);

// ------ CLIENT ------
app.get('/user-info', auth, getUserInfo);

// ------ ADDRESS ------
app.get('/states', auth, getStates);
app.post('/address', auth, postAddress);

// ------ SUBSCRIBE ------
app.post('/subscribe', auth, toSign);

export {
    app,
};

import express from 'express';
import cors from 'cors';

import { auth } from './middlewares/auth.js';
import { getStates, postAddress } from './controllers/address.js';

import * as userController from './controllers/userController.js';
import * as planController from './controllers/planController.js';
import * as subscriptionController from './controllers/subscriptionController.js';

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
app.get('/user-info', auth, userController.getUserInfo);

// ------ ADDRESS ------
app.get('/states', auth, getStates);
app.post('/address', auth, postAddress);

// ------ SUBSCRIBE ------
app.post('/subscribe', auth, subscriptionController.toSign);

export {
    app,
};

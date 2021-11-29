import * as planService from '../services/planService.js';

async function getPlans(req, res) {
    try {
        const plans = await planService.getPlans();

        return res.status(200).send(plans);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function getUserPlan(req, res) {
    const userId = res.locals.user?.userId;

    try {
        const plans = await planService.getUserPlan({ userId });

        if (plans) {
            return res.status(200).send(plans);
        }
        return res.status(404);
    } catch (error) {
        return res.status(500);
    }
}

export {
    getPlans,
    getUserPlan,
};

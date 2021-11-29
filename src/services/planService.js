import * as planRepository from '../repositories/planRepository.js';

async function getPlans() {
    const plans = await planRepository.getPlans();

    if (plans) {
        return plans;
    }
    return false;
}

async function getUserPlan({ userId }) {
    const userPlan = await planRepository.getUserPlan({ userId });

    if (userPlan) {
        return userPlan;
    }
    return false;
}

async function getPlanByName({ name }) {
    const userPlan = await planRepository.getPlanByName({ name });

    if (userPlan) {
        return userPlan;
    }
    return false;
}

export {
    getPlans,
    getUserPlan,
    getPlanByName,
};

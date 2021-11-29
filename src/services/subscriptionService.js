import * as subscriptionRepository from '../repositories/subscriptionRepository.js';

async function subscribe({ userId, planId, dateToReceive }) {
    const userPlan = await subscriptionRepository.create({ userId, planId, dateToReceive });

    if (userPlan) {
        return userPlan;
    }
    return false;
}

async function relationProductsSubscription({ subscriptionId, productId }) {
    try {
        const products = await subscriptionRepository.createRelationProductSubscription({
            subscriptionId,
            productId,
        });

        return products;
    } catch (error) {
        return false;
    }
}

export {
    subscribe,
    relationProductsSubscription,
};

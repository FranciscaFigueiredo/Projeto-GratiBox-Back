import * as planService from '../services/planService.js';
import * as subscriptionService from '../services/subscriptionService.js';
import * as productService from '../services/productService.js';
import { subscriptionSchema } from '../validation/subscription.js';

async function toSign(req, res) {
    const userId = res.locals.user?.userId;

    const {
        plan,
        data,
        products,
    } = req.body;
    let day = data;

    const {
        name,
    } = plan;

    const validate = subscriptionSchema.validate({
        name,
        products,
    });

    if (validate.error) {
        return res.sendStatus(400);
    }

    if (data === 'Segunda') {
        day = 1;
    }
    if (data === 'Terça') {
        day = 2;
    }
    if (data === 'Quarta') {
        day = 3;
    }
    if (data === 'Quinta') {
        day = 4;
    }
    if (data === 'Sexta') {
        day = 5;
    }
    try {
        const planUser = await planService.getUserPlan({ userId });
        const planData = await planService.getPlanByName({ name });
        if (!planUser.length) {
            const subscriptionData = await subscriptionService.subscribe({
                userId,
                planId: planData.id,
                dateToReceive: day,
            });

            products.map(async (prod) => {
                const product = await productService.getProductInfo({ prod });

                await subscriptionService.relationProductsSubscription({
                    subscriptionId: subscriptionData.id,
                    productId: product.id,
                });
            });
            return res.status(200).send(subscriptionData);
        }

        return res.sendStatus(409);
    } catch (error) {
        return res.status(500);
    }
}

export {
    toSign,
};

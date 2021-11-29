import joi from 'joi';

const subscriptionSchema = joi.object({
    name: joi.string().min(3).required(),
    products: joi.string().min(3).required(),
});

export {
    subscriptionSchema,
};

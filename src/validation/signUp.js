import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().min(3).max(60).required(),
    email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().min(6),
    confirmPassword: joi.ref('password'),
});

export {
    userSchema,
};

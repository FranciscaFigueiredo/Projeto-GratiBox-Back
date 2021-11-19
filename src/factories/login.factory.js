// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

function validBodyFactoryLogin() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

function invalidBodyFactoryLogin() {
    return {
        email: faker.name.findName(),
        password: faker.internet.password(),
    };
}

export {
    validBodyFactoryLogin,
    invalidBodyFactoryLogin,
};

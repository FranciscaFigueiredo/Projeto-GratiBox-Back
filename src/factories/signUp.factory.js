// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

function validBodyFactorySignUp() {
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

function invalidBodyFactorySignUp() {
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

export {
    validBodyFactorySignUp,
    invalidBodyFactorySignUp,
};

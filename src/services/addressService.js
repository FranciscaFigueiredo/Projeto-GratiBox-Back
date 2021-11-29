import * as addressRepository from '../repositories/addressRepository.js';

async function getStates() {
    const states = await addressRepository.listStates();
    if (states.length) {
        return states;
    }
    return false;
}

export {
    getStates,
};

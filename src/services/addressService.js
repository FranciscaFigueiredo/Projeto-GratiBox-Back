import * as addressRepository from '../repositories/addressRepository.js';
import * as userRepository from '../repositories/userRepository.js';

async function getStates() {
    const states = await addressRepository.listStates();
    if (states.length) {
        return states;
    }
    return false;
}

async function getStateByAcronym({ acronym }) {
    const state = await addressRepository.getStateByAcronym({ acronym });
    if (state.length) {
        return state;
    }
    return false;
}

async function getCityByName({ name }) {
    const city = await addressRepository.getStateByAcronym({ name });
    if (city.length) {
        return city;
    }
    return false;
}

async function createCity({ name, stateId }) {
    const city = await addressRepository.createCity({ name, stateId });
    if (city.length) {
        return city;
    }
    return false;
}

async function createAddress({ street, cep, cityId }) {
    const address = await addressRepository.createAddress({ street, cep, cityId });
    if (address.length) {
        return address;
    }
    return false;
}

async function updateUserAddress({ addressId, userId }) {
    const address = await userRepository.updateAddress({ addressId, userId });
    if (address) {
        return address;
    }
    return false;
}

export {
    getStates,
    getStateByAcronym,
    getCityByName,
    createCity,
    createAddress,
    updateUserAddress,
};

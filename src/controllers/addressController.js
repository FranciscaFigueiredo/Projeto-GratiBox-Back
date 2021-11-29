import * as addressService from '../services/addressService.js';

async function getStates(req, res) {
    try {
        const states = await addressService.getStates();
        return res.status(200).send(states);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    getStates,
};

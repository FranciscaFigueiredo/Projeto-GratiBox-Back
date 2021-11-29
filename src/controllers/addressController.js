import * as addressService from '../services/addressService.js';

async function getStates(req, res) {
    try {
        const states = await addressService.getStates();
        return res.status(200).send(states);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function postAddress(req, res) {
    const userId = res.locals.user.idUser;

    const {
        street,
        cep,
        city,
        state,
    } = req.body;

    try {
        const searchCity = await addressService.getCityByName({ name: city });

        const stateData = await addressService.getStateByAcronym({ acronym: state });

        let cityData;

        if (!searchCity) {
            cityData = await addressService.createCity({ name: city, stateId: stateData.id });
        }

        const address = await addressService.createAddress({ street, cep, cityId: cityData.id });

        await addressService.updateUserAddress({ addressId: address.id, userId });

        return res.status(200).send(address.rows);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    getStates,
    postAddress,
};

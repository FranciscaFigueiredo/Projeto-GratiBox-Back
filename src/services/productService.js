import * as productRepository from '../repositories/productRepository.js';

async function getProductInfo({ name }) {
    const product = await productRepository.getProductInfo({ name });

    if (product) {
        return product;
    }
    return false;
}

export {
    getProductInfo,
};

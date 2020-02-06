import { combineReducers } from 'redux';
import { findIndex, equals, filter, not, inc, length } from 'ramda';
import { getSiteById } from '../selectors'
// reducers/products.js
function addProduct(state, action) {
    const { payload } = action;
    const {
        productId,
        name,
        videoUrl,
        duration,
        shots,
        category,
        number,
        tubeLength,
        nec,
        effectType,
        price,
        image
    } = payload;

    // Create our new Product object
    const product = {
        id: productId,
        name,
        videoUrl,
        duration,
        shots,
        category,
        number,
        tubeLength,
        nec,
        effectType,
        price,
        image
    };

    // Insert the new Product object into the updated lookup table
    return {
        ...state,
        [productId]: product
    }
}

function removeProduct(state, action) {
    const { payload } = action;
    const {
        productId,
    } = payload;
    // Insert the new Product object into the updated lookup table
    const filterProduct = (productId, product) => not(equals(productId, product.id));
    return filter((product)=> filterProduct(productId, product), state);
}

function editProduct(state, action) {
    const { payload } = action;
    const {
        productId,
        position
    } = payload;

    // Create our new Product object
    const product = {
        position
    };

    // Insert the new Product object into the updated lookup table
    return {
        ...state,
        [productId]: product
    }
}

function allProductId(state = [], action) {
    const { payload } = action;
    const { productId } = payload;
    // Just append the new Product's ID to the list of all IDs
    return state.concat(productId);
}

function removeProductId(state = [], action) {
    const { payload } = action;
    const { productId } = payload;
    return filter((product) => (not(equals(productId, product))), state);

}

function productsById(state = {}, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return addProduct(state, action);
        case 'REMOVE_PRODUCT':
            return removeProduct(state, action);
        case 'EDIT_PRODUCT':
            return editProduct(state, action);
        default:
            return state
    }
}

function allProducts(state = {}, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return allProductId(state, action);
        case 'REMOVE_PRODUCT':
            return removeProductId(state, action);
        default:
            return state
    }
}

export default combineReducers({
    byId: productsById,
    allIds: allProducts
});
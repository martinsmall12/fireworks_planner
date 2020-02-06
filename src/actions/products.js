import uuid from "uuid";

export const addProduct = (
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
       image,
       caliber
) => {
    const productId = uuid.v4();
    return {
            type: 'ADD_PRODUCT',
            payload: {
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
                image,
                caliber
            }
    };
}

export const removeProductById = (productId) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: {
            productId,
        }
    }
};


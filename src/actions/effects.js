import uuid from "uuid";
export const addEffect = (siteId, name) => {
    const effectId = uuid.v4();

    return {
        type: 'ADD_EFFECT',
        payload: {
            siteId,
            effectId,
            name
        }
    }
}
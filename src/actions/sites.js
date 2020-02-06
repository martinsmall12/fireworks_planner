import uuid from "uuid";
export const addSite = (sceneId, siteTitle) => {
    const siteId = uuid.v4();

    return {
        type: 'ADD_SITE',
        payload: {
            sceneId,
            siteId,
            siteTitle
        }
    }
}
import uuid from "uuid";
export const addScene = (sceneTitle) => {
    const scenesId = uuid.v4();

    return {
        type: 'ADD_SCENE',
        payload: {
            scenesId,
            sceneTitle
        }
    }
}
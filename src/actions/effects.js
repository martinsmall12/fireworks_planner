import uuid from "uuid";
import {getSiteById} from "../selectors";
import {inc, length, propOr} from "ramda";

export const addEffect = (siteId, name, videoUrl, previewPosition, duration, shots ) => {
    const effectId = uuid.v4();
    return (dispatch, getState) => {
        const state = getState();
        const site = state.entities.Sites.byId[siteId];
        const position = inc(length(site.effects));

        dispatch({
            type: 'ADD_EFFECT',
            payload: {
                siteId,
                effectId,
                name,
                videoUrl,
                previewPosition,
                duration,
                shots,
                position,
            }
        });
    };
}

export const removeEffectById = (effectId, siteId) => {
    return {
        type: 'REMOVE_EFFECT',
        payload: {
            effectId,
            siteId,
        }
    }
}
import { combineReducers } from 'redux';
import { findIndex, equals, filter, not, inc, length } from 'ramda';
import { getSiteById } from '../selectors'
// reducers/effects.js
function addEffect(state, action) {
    const { payload } = action;
    const {
        effectId,
        name,
        videoUrl,
        previewPosition,
        duration,
        shots,
        position,
        siteId
    } = payload;

    // Create our new Effect object
    const effect = {
        id: effectId,
        name,
        videoUrl,
        previewPosition: Number(previewPosition),
        duration,
        shots,
        color: 'hsla(0, 0%, 88%, 20%)',
        loop: false,
        start: 0,
        end: Number(duration),
        data: siteId,
        position,
        resize: false,
    };

    // Insert the new Effect object into the updated lookup table
    return {
        ...state,
        [effectId]: effect
    }
}

function removeEffect(state, action) {
    const { payload } = action;
    const {
        effectId,
    } = payload;
    // Insert the new Effect object into the updated lookup table
    const filterEffect = (effectId, effect) => not(equals(effectId, effect.id));
    const result = filter((effect)=> filterEffect(effectId, effect), state);
    return result;
}

function editEffect(state, action) {
    const { payload } = action;
    const {
        effectId,
        position
    } = payload;

    // Create our new Effect object
    const effect = {
        position
    };

    // Insert the new Effect object into the updated lookup table
    return {
        ...state,
        [effectId]: effect
    }
}

function allEffectId(state = [], action) {
    const { payload } = action;
    const { effectId } = payload;
    // Just append the new Effect's ID to the list of all IDs
    return state.concat(effectId);
}

function removeEffectId(state = [], action) {
    const { payload } = action;
    const { effectId } = payload;
    return filter((effect) => (not(equals(effectId, effect))), state);

}

function effectsById(state = {}, action) {
    switch (action.type) {
        case 'ADD_EFFECT':
            return addEffect(state, action);
        case 'REMOVE_EFFECT':
            return removeEffect(state, action);
        case 'EDIT_EFFECT':
            return editEffect(state, action);
        default:
            return state
    }
}

function allEffects(state = {}, action) {
    switch (action.type) {
        case 'ADD_EFFECT':
            return allEffectId(state, action);
        case 'REMOVE_EFFECT':
            return removeEffectId(state, action);
        default:
            return state
    }
}

export default combineReducers({
    byId: effectsById,
    allIds: allEffects
});
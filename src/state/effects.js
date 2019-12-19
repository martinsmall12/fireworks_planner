import { combineReducers } from 'redux';

// reducers/effects.js
function addEffect(state, action) {
    const { payload } = action;
    const { effectId, name } = payload;

    // Create our new Effect object
    const effect = { id: effectId, name };
    console.log(state);

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

function effectsById(state = {}, action) {
    switch (action.type) {
        case 'ADD_EFFECT':
            return addEffect(state, action);
        default:
            return state
    }
}

function allEffects(state = {}, action) {
    switch (action.type) {
        case 'ADD_EFFECT':
            return allEffectId(state, action);
        default:
            return state
    }
}

export default combineReducers({
    byId: effectsById,
    allIds: allEffects
});
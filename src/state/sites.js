import { combineReducers } from 'redux';
import {equals, filter, pick, not, assoc} from "ramda";

// reducers/sites.js

function addEffectToSite(state = [], action) {
    const { payload } = action;
    const { siteId, effectId } = payload;
    const site = state[siteId];

    return {
        ...state,
        // Update our Scene object with a new "sites" array
        [siteId]: {
            ...site,
            effects: site.effects.concat(effectId)
        }
    }
}


function addSite(state, action) {
    const { payload } = action;
    const { siteId, siteTitle } = payload;

    // Create our new Site object
    const site = { id: siteId, title: siteTitle, effects: [] };
    // Insert the new Site object into the updated lookup table
    return {
        ...state,
        [siteId]: site
    }
}

function allSitesId(state = [], action) {
    const { payload } = action;
    const { siteId } = payload;
    return state.concat(siteId);
}

function removeEffect(state = [], action) {
    const { payload } = action;
    const { effectId, siteId } = payload;
    const leftEffects = filter((effect) => (not(equals(effectId, effect))), state[siteId].effects);

    const siteWithoutEffect = pick(['id', 'title'], state[siteId]);
    return {...state,
        [siteId]: assoc('effects', leftEffects, siteWithoutEffect)
    }
}

function sitesById(state = {}, action) {
    switch (action.type) {
        case 'ADD_SITE':
            return addSite(state, action);
        case 'ADD_EFFECT':
            return addEffectToSite(state, action);
        case 'REMOVE_EFFECT':
            return removeEffect(state, action);
        default:
            return state
    }
}

function allSites(state = {}, action) {
    switch (action.type) {
        case 'ADD_SITE':
            return allSitesId(state, action);
        default:
            return state
    }
}

export default combineReducers({
    byId: sitesById,
    allIds: allSites
});
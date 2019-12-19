import { combineReducers } from 'redux';

// reducers/scenes.js
function addSiteToScene(state, action) {
    const { payload } = action;
    const { sceneId, siteId } = payload;

    const scene = state[sceneId];

    return {
        ...state,
        // Update our Scene object with a new "sites" array
        [sceneId]: {
            ...scene,
            sites: scene.sites.concat(siteId)
        }
    }
}

function addScene(state, action) {
    const { payload } = action;
    const { sceneId, sceneTitle } = payload;
    // Look up the correct scene, to simplify the rest of the code

    return {
        ...state,
        [sceneId]: {
            sceneId,
            sceneTitle,
         }
    }
}

function scenesById(state = {}, action) {
    switch (action.type) {
        case 'ADD_SITE':
            return addSiteToScene(state, action);
        case 'ADD_SCENE':
            return addScene(state, action);
        default:
            return state
    }
}

function allScenes(state = [], action) {
    return state;
}

export default combineReducers({
    byId: scenesById,
    allIds: allScenes
});
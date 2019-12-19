import {compose, map, path, prop, assoc } from "ramda";
import { createSelector } from 'reselect';

export const getEntities = path(['entities']);

export const getEffectsAllIds =  createSelector(getEntities, path(['Effects', 'allIds']));
export const getEffectById =  createSelector(getEntities, path(['Effects', 'byId']));
export const getSitesAllIds =  createSelector(getEntities, path(['Sites', 'allIds']));
export const getSiteById = createSelector(getEntities, path(['Sites', 'byId']));
export const getScenesAllIds = createSelector(getEntities, path(['Scenes', 'allIds']));
export const getSceneById = createSelector(getEntities, path(['Scenes', 'byId']));

export const getScenes = createSelector([getScenesAllIds, getSceneById], (allId, byId) =>  map(id => byId[id], allId));

export const getSites = createSelector([getSitesAllIds, getSiteById], (allId, byId) =>  map(id => byId[id], allId));

export const getEffects = createSelector([getEffectsAllIds, getEffectById], (allId, byId) =>  map(id => byId[id], allId));

export const getSitesInSceneWithEffects = (sceneId) => createSelector([getSiteById, getSceneById, getEffectById], (sitesById, scenesById, effectById) => {
    const sites = map(id => sitesById[id], prop('sites', scenesById[sceneId]));
    return map(site => assoc('effects', map(id => effectById[id], prop('effects', sitesById[site.id])), site), sites);
});

export const getEffectsInSite = (siteId) => createSelector([getEffectById, getSiteById], (effectById, sitesById) => {
    return map(id => effectById[id], prop('effects', sitesById[siteId]));
});
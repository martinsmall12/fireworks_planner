import {map, path, prop, assoc, pathOr, sort, sortBy, addIndex, inc, indexBy, mergeWith, pipe, values, reduce, merge} from "ramda";
import {createSelector} from 'reselect';

const mapIndexed = addIndex(map);
const mergeArrays = pipe(
    map(indexBy(prop('id'))),
    reduce(mergeWith(merge), {}),
    values
);

const sortByPosition = sortBy(prop('position'));

export const getEntities = path(['entities']);

export const getEffectsAllIds = createSelector(getEntities, pathOr([], ['Effects', 'allIds']));
export const getEffectById = createSelector(getEntities, pathOr({}, ['Effects', 'byId']));
export const getSitesAllIds = createSelector(getEntities, pathOr([], ['Sites', 'allIds']));
export const getSiteById = createSelector(getEntities, pathOr({}, ['Sites', 'byId']));
export const getScenesAllIds = createSelector(getEntities, pathOr([], ['Scenes', 'allIds']));
export const getSceneById = createSelector(getEntities, pathOr({}, ['Scenes', 'byId']));
export const getProductsAllIds = createSelector(getEntities, pathOr([], ['Products', 'allIds']));
export const getProductById = createSelector(getEntities, pathOr({}, ['Products', 'byId']));


export const getScenes = createSelector([getScenesAllIds, getSceneById], (allId, byId) => map(id => byId[id], allId));

export const getSites = createSelector([getSitesAllIds, getSiteById], (allId, byId) => map(id => byId[id], allId));

export const getEffects = createSelector([getEffectsAllIds, getEffectById], (allId, byId) => map(id => byId[id], allId));

export const getProducts = createSelector([getProductsAllIds, getProductById], (allId, byId) => map(id => byId[id], allId));

export const getSitesInSceneWithEffects = (sceneId) => createSelector([getSceneById, getSiteById, getEffectById],
    (scenesById, sitesById, effectById) => {
        const sites = map(id => sitesById[id], prop('sites', scenesById[sceneId]));
        const effects = (siteId) => map(id => effectById[id], prop('effects', sitesById[siteId]));
        const renumberPosition = (effects) => mapIndexed((val, idx) => assoc('position', inc(idx), val), effects);
        return map(site => assoc('effects', sortByPosition(renumberPosition(effects(site.id))), site), sites);
    });

export const getEffectsInSite = (siteId) => createSelector([getEffectById, getSiteById], (effectById, sitesById) => {
    return map(id => effectById[id], prop('effects', sitesById[siteId]));
});

export const getEffectsInScene = (sceneId) => createSelector([getSceneById, getSiteById, getEffectById],
    (scenesById, sitesById, effectById) => {
        const sites = map(id => sitesById[id], prop('sites', scenesById[sceneId]));
        const effects = (siteId) => map(id => effectById[id], prop('effects', sitesById[siteId]));
        const siteWithEffects =  map(site => effects(site.id), sites);
        return mergeArrays(siteWithEffects);
});
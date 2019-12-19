import { compose, inc, reduce, map, max } from 'ramda';
import uuid from "uuid";


const initialState = {
    entities: {
        scenes: {
            byId : {
                "scene1" : {
                    id : "scene1",
                    name: "Čáslav",
                    sites : ["site1", "site2", "site3"]
                },
                "scene2" : {
                    id : "scene2",
                    name: "Spojil",
                    sites : ["site1", "site3"]
                },
            },
            allIds : ["scene1", "scene2"]
        },
        sites: {
            byId : {
                "site1" : {
                    id : "site1",
                    title: "Levá",
                    effects : ["effect1", "effect2"]
                },
                "site2" : {
                    id : "site2",
                    title: "Střed",
                    effects : ["effect1", "effect2"]
                },
                "site3" : {
                    id : "site3",
                    title: "Pravá",
                    effects : ["effect1", "effect2"]
                },
            },
            allIds : ["site1", "site2", "site3"]
        },
        effects: {
            byId : {
                "effect1" : {
                    id : "effect1",
                    name: "Fontana",
                    shots: 1,
                    duration: 82,
                    videoUrl: "R8O4mO-bbUM",
                    start: 0,
                    end: 82,
                    loop: false,
                    color: 'hsla(0, 0%, 88%, 20%)',
                    previewPosition: 7,
                    firePlace: 'left',
                    position: 1,
                },
                "effect2" : {
                    id : "effect2",
                    name: "Tajfun C",
                    shots: 36,
                    duration: 21,
                    videoUrl: "5gOOI2Hs8JM",
                    start: 30,
                    end: 51,
                    loop: false,
                    color: 'hsla(0, 0%, 88%, 20%)',
                    previewPosition: 4,
                    firePlace: 'right',
                    position: 2,
                },
            },
            allIds : ["effect1", "effect2"]
        }
    }
};

const TOOGLE_DARKMODE = 'TOGGLE_DARKMODE';
const ADD_LANES = 'ADD_LANES';
const REMOVE_LANE = 'REMOVE_LANE';
const UPDATE_REGION = 'UPDATE_REGION';

export const toggleDarkMode = isDarkMode => ({ type: TOOGLE_DARKMODE, isDarkMode });

export function addLane(title) {
    return { type: ADD_LANES, title }
}

export function removeLane(id) {
    return { type: REMOVE_LANE, id }
}

export function updateRegion(id) {
    return { type: UPDATE_REGION, id }
}

export default (state = initialState, action) => {
switch (action.type) {
    case TOOGLE_DARKMODE:
        console.log(state);
        return { ...state, isDarkMode: action.isDarkMode };
    case ADD_LANES:
        console.log(state);
        return Object.assign({}, state, {
            board: {
                lanes: [
                    ...state.board.lanes,
                    {
                        id: compose(inc, reduce(max, -Infinity), map((lane)=>lane.id))(state.board.lanes),
                        title: action.title
                    }
                ]
            }
        });
    case REMOVE_LANE:
        return Object.assign({}, state, {
            board: {
                lanes: reduce((lane) => lane.id === action.id, state.board.lanes)
            }
        });
    case UPDATE_REGION:
        return Object.assign({}, state, {
            board: {
                lanes: reduce((lane) => lane.id === action.id, state.board.lanes)
            }
        });

    default:
        console.log(state);
        return state;
    }
};
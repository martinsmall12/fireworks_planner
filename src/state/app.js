import { compose, inc, reduce, map, max } from 'ramda';

const initialState = {
    board: {
        countOfYoutubeWindow: 6,
        lanes: [
            {
                id: 1,
                title: 'Leva',
                cards: [
                    {
                        id: 1,
                        name: 'Fontana',
                        shots: 1,
                        duration: 60,
                        videoUrl: "NTkv2uzVSOc",
                        start: 0,
                        end: 60,
                        loop: false,
                        color: 'hsla(100, 100%, 30%, 0.5)',
                        previewPosition: 4,
                        firePlace: 'left'
                    },
                    {
                        id: 2,
                        name: 'Kompakt',
                        shots: 25,
                        duration: 20,
                        videoUrl: "ghzsOnfXCsA",
                        start: 30,
                        end: 60,
                        loop: false,
                        color: 'hsla(100, 100%, 30%, 0.5)',
                        previewPosition: 1,
                        firePlace: 'left',
                    },
                    {
                        id: 3,
                        name: 'Kompakt',
                        shots: 100,
                        duration: 25,
                        videoUrl: "OYyIr5cZkXM",
                        start: 50,
                        end: 75,
                        loop: false,
                        color: 'hsla(100, 100%, 30%, 0.5)',
                        previewPosition: 1,
                        firePlace: 'left',
                    },
                ]
            },
            {
                id: 2,
                title: 'Stred',
                cards: [
                    {
                        id: 1,
                        name: 'Fontana',
                        shots: 1,
                        duration: 60,
                        videoUrl: "NTkv2uzVSOc",
                        start: 0,
                        end: 60,
                        loop: false,
                        color: 'hsla(250, 100%, 30%, 0.5)',
                        previewPosition: 5,
                        firePlace: 'middle'
                    },
                    {
                        id: 2,
                        name: 'Kompakt',
                        shots: 25,
                        duration: 20,
                        videoUrl: "ghzsOnfXCsA",
                        start: 20,
                        end: 45,
                        loop: false,
                        color: 'hsla(250, 100%, 30%, 0.5)',
                        previewPosition: 2,
                        firePlace: 'middle'
                    },
                    {
                        id: 3,
                        name: 'Kompakt',
                        shots: 100,
                        duration: 25,
                        videoUrl: "OYyIr5cZkXM",
                        start: 70,
                        end: 90,
                        loop: false,
                        color: 'hsla(250, 100%, 30%, 0.5)',
                        previewPosition: 2,
                        firePlace: 'middle'
                    },
                ]
            },
            {
                id: 3,
                title: 'Prava',
                cards: [
                    {
                        id: 1,
                        name: 'Fontana',
                        shots: 1,
                        duration: 60,
                        videoUrl: "NTkv2uzVSOc",
                        start: 0,
                        end: 60,
                        loop: false,
                        color: 'hsla(100, 100%, 30%, 0.5)',
                        previewPosition: 6,
                        firePlace: 'right'
                    },
                    {
                        id: 2,
                        name: 'Kompakt',
                        shots: 25,
                        duration: 20,
                        videoUrl: "ghzsOnfXCsA",
                        start: 30,
                        end: 60,
                        loop: false,
                        color: 'hsla(100, 100%, 30%, 0.5)',
                        previewPosition: 3,
                        firePlace: 'right'
                    },
                    {
                        id: 3,
                        name: 'Kompakt',
                        shots: 100,
                        duration: 25,
                        videoUrl: "OYyIr5cZkXM",
                        start: 50,
                        end: 75,
                        loop: false,
                        color: 'hsla(100, 100%, 30%, 0.5)',
                        previewPosition: 3,
                        firePlace: 'right'
                    },
                ]
            }
        ]
    }
};

const TOOGLE_DARKMODE = 'TOGGLE_DARKMODE';
const ADD_LANES = 'ADD_LANES';
const REMOVE_LANE = 'REMOVE_LANE';

export const toggleDarkMode = isDarkMode => ({ type: TOOGLE_DARKMODE, isDarkMode });

export function addLane(title) {
    return { type: ADD_LANES, title }
}

export function removeLane(id) {
    return { type: REMOVE_LANE, id }
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

    default:
        console.log(state);
        return state;
    }
};
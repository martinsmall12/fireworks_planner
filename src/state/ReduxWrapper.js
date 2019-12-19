import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '.';

const initialState = {
    entities: {
        Scenes: {
            byId : {
                "scene1" : {
                    id : "scene1",
                    name: "Spojil",
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
        Sites: {
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
        Effects: {
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

const createStore = (init) => reduxCreateStore(rootReducer, init);
export default ({ element }) => (
  <Provider store={createStore(initialState)}>{element}</Provider>
);

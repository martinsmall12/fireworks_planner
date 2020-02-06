import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore, applyMiddleware  } from 'redux';
import rootReducer from '.';
//import Raven from "raven-js";
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
//import createRavenMiddleware from "raven-for-redux";


const initialState = {
    entities: {
        Scenes: {
            byId : {
                "scene1" : {
                    id : "scene1",
                    name: "Časlav",
                    sites : []
                },
            },
            allIds : ["scene1"]
        },
        Sites: {
            byId : {},
            allIds : []
        },
        Effects: {
            byId : {},
            allIds : []
        }
    }
};

const logger = createLogger();
const createStore = (init) => reduxCreateStore(rootReducer, init,  applyMiddleware(logger, thunk));
export default ({ element }) => (
  <Provider store={createStore(initialState)}>{element}</Provider>
);

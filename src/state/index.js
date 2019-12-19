import { combineReducers } from 'redux';
import app from './app';
import Scenes from './scenes';
import Sites from './sites';
import Effects from './effects';


const entities = combineReducers({
    Scenes,
    Sites,
    Effects,
});

export default combineReducers({entities: entities});






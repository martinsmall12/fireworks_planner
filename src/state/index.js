import { combineReducers } from 'redux';
import Scenes from './scenes';
import Sites from './sites';
import Effects from './effects';
import Products from './products';


const entities = combineReducers({
    Scenes,
    Sites,
    Effects,
    Products,
});

export default combineReducers({entities: entities});






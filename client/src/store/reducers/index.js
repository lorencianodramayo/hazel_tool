// Redux
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
import templatesReducer from './templates';
import creativeReducer from './creative';
import languageReducer from './language';

const rootReducer = combineReducers({
    templates: templatesReducer,
    creative: creativeReducer,
    language: languageReducer,
});

export default rootReducer;

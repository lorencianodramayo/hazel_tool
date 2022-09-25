// Redux
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
import templatesReducer from './templates';
import creativeReducer from './creative';

const rootReducer = combineReducers({
    templates: templatesReducer,
    creative: creativeReducer,
});

export default rootReducer;

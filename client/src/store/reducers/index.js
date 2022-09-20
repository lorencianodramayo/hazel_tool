// Redux
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
import templatesReducer from './templates';

const rootReducer = combineReducers({
    templates: templatesReducer,
});

export default rootReducer;

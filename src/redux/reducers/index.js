import {combineReducers} from 'redux';
import settings from './settings_reducer';
import debts from './debt_reducer';

const rootReducer = combineReducers({
    settings,
    debts
})

export default rootReducer;
import {combineReducers} from 'redux';
import settings from './settings_reducer';
import debts from './debt_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    settings,
    debts,
    user
})

export default rootReducer;
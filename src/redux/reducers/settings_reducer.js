import { combineReducers } from 'redux';

const userSettings = (state = {}, action ) => {
    if (action.type === 'SET_USER_SETTINGS'){
        return action.payload;
    } else {
        return state;
    }
}

export default combineReducers({
    userSettings
})
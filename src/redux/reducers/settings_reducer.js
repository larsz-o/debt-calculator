import { combineReducers } from 'redux';

const userSettings = (state = {method: ''}, action ) => {
    if (action.type === 'SET_METHOD'){
        return action.payload;
    } 
    else {
        return state;
    } 
}


export default combineReducers({
    userSettings, 

})
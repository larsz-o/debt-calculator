import { combineReducers } from 'redux';

const userSettings = (state = {method: ''}, action ) => {
    if (action.type === 'SET_METHOD'){
        return action.payload;
    } 
    else {
        return state;
    } 
}

const gif = (state = [], action) =>{
    if (action.type === 'SET_GIF'){
        return action.payload.data[0].embed_url;
    }
    else {
        return state;
    }
}

export default combineReducers({
    userSettings, 
    gif
})
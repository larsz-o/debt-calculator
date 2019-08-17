import { combineReducers } from 'redux';

const debts = (state = [], action ) => {
    if (action.type === 'SET_DEBTS'){
        return action.payload;
    } else {
        return state;
    }
}

export default combineReducers({
    debts
})
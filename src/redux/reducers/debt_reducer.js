import { combineReducers } from 'redux';

const debts = (state = [], action ) => {
    if (action.type === 'SET_DEBTS'){
        return action.payload;
    } else {
        return state;
    }
}
const payments = (state = [], action) => {
    if (action.type === 'SET_PAYMENTS'){
        return action.payload;
    } else {
        return state; 
    }
}
const additions = (state = [], action) => {
    if (action.type === 'SET_INTEREST'){
        return action.payload;
    } else {
        return state; 
    }
}
const advance = (state = false, action) =>{
    if(action.type === 'ADVANCE_TRUE'){
        return true; 
    } else { 
        return state; 
    }
}
export default combineReducers({
    debts,
    payments, 
    additions, 
    advance
  
})
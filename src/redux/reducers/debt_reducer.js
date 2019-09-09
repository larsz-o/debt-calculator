import { combineReducers } from 'redux';

const debts = (state = {debtList: [], total: 0, monthlyPayments: 0, timeRemaining: 0}, action ) => {
    if (action.type === 'SET_DEBTS'){
        let total = action.payload.reduce((accumulator, debt) => accumulator + debt.current_principle, 0);
        let monthlyPayments = action.payload.reduce((accumulator, debt) =>  accumulator + debt.current_payment, 0);
        let timeRemaining = total/monthlyPayments;
        return {debtList: action.payload, total: total, monthlyPayments: monthlyPayments, timeRemaining: timeRemaining};
    } else {
        return state;
    }
}
const payments = (state = {paymentsList: [], total: 0}, action) => {
    if (action.type === 'SET_PAYMENTS'){
        let paidOff = action.payload.reduce((accumulator, payment) => accumulator + payment.amount, 0);
        return {paymentsList: action.payload, total: paidOff};
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
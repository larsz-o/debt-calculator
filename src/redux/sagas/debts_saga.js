import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

function* addPayment(action){
    try {
        yield call (axios.post, '/api/debts/payments', action.payload); 
        yield put({type: 'FETCH_PAYMENTS'}); 
    } catch(error){
        console.log('error posting payment', error); 
    }
}

function* fetchDebts(){
    try{
        const response = yield call(axios.get, '/api/debts');
        yield put({type: 'SET_DEBTS', payload: response.data})
        yield put({type: 'FETCH_PAYMENTS'});
    } catch(error){
        console.log('error getting debts', error)
    }
}
function* fetchInterest(){
    try {
        const response = yield call(axios.get, 'api/debts/interest'); 
        console.log(response.data);
        yield put({type: 'SET_INTEREST', payload: response.data});

    } catch (error) {
        console.log('Error fetching interest', error); 
    }
}
function* fetchPayments(){
    try { 
        const response = yield call(axios.get, '/api/debts/payments');
        console.log(response.data); 
        yield put({type: 'SET_PAYMENTS', payload: response.data}); 
        yield put({type: 'FETCH_INTEREST'});
    } catch (error){
        console.log('error getting payments', error);
    }
}
function* postDebts(action){
    try{
        yield call(axios.post, '/api/debts', action.payload);
        yield put({type: 'FETCH_DEBTS'});
        //tells app to move user to dashboard
        yield put({type: 'ADVANCE_TRUE'});
    } catch(error){
        swal('Oh no!', 'Something went wrong posting your debt.', 'error');
        console.log('error posting debts', error)
    } 
}

function* debtSaga(){
    yield takeLatest('POST_DEBT', postDebts);
    yield takeLatest('FETCH_DEBTS', fetchDebts);
    yield takeLatest('FETCH_PAYMENTS', fetchPayments);
    yield takeLatest('ADD_PAYMENT', addPayment);
    yield takeLatest('FETCH_INTEREST', fetchInterest);
}

export default debtSaga;
import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

function* fetchDebts(){
    try{
        const response = yield call(axios.get, '/api/debts');
        yield put({type: 'SET_DEBTS', payload: response.data})
    } catch(error){
        console.log('error getting debts', error)
    }
}
function* postDebts(action){
    try{
        yield call(axios.post, '/api/debts', action.payload);
        yield put({type: 'FETCH_DEBTS'});
    } catch(error){
        swal('Oh no!', 'Something went wrong posting your debt.', 'error');
        console.log('error posting debts', error)
    } 
}

function* debtSaga(){
    yield takeLatest('POST_DEBT', postDebts);
    yield takeLatest('FETCH_DEBTS', fetchDebts)
}

export default debtSaga;
import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';


function* fetchSettings(){
    try { 
        let response = yield call(axios.get, '/api/settings');
        yield put({type: 'SET_METHOD', payload: response.data});
    } catch (error){
        console.log('Error getting settings', error); 
    }
}
function* saveMethod(action){
    try{
        console.log('im in the saga', action)
        yield call(axios.post, '/api/settings', action.payload);
        yield put({type: 'FETCH_SETTINGS'});
    } catch(error){
        swal('Oh no!', 'Something went wrong posting your settings.', 'error');
        console.log('error posting settings', error)
    } 
}

function* settingsSaga(){
    yield takeLatest('SAVE_METHOD', saveMethod);
    yield takeLatest('FETCH_SETTINGS', fetchSettings);
}

export default settingsSaga;
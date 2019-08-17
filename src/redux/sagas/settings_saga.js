import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';


function* fetchSettings(){
    try { 
        let response = yield call(axios.get, '/api/settings');
        yield put({type: 'SET_METHOD', payload: response.data});
        let gif = yield call(axios.get, `https://api.giphy.com/v1/gifs/search?api_key=V5ttoH4Fq3wB5glm7XUfvOVmVM6JGk8C&q=${response.data[0].method}&limit=1&offset=0&rating=G&lang=en`);
        yield put({type: 'SET_GIF', payload: gif.data}); 
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
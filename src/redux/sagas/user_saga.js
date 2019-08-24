import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

function* registerUser(action){
    try {
        yield call(axios.post, '/api/user/register', action.payload); 
    } catch (error) {
        swal('Oh no!', 'Username taken', 'error'); 
    } 
}

function* userSaga(){
yield takeLatest('REGISTER_USER', registerUser);

}

export default userSaga;
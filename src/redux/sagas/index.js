import { all } from 'redux-saga/effects';
import debtSaga from './debts_saga';

export default function* rootSaga(){
    yield all ([
        debtSaga(),
    ])
}
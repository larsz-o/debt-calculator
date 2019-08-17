import { all } from 'redux-saga/effects';
import debtSaga from './debts_saga';
import settingsSaga from './settings_saga';

export default function* rootSaga(){
    yield all ([
        debtSaga(),
        settingsSaga(),
    ])
}
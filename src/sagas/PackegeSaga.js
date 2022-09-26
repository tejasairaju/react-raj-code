import { put, call, takeLatest, all } from 'redux-saga/effects';
import Services from '../services/Packege.Services.js';
import actions from '../actions/PopupActions';
const { getPackegeDteils } = Services;
function* getPackegeDteilsSaga(action) {
    try {
        yield put(actions.requestPageLoader());
        const response = yield call(getPackegeDteils, action);
        yield put({ type: "GET_PACKEGE_SUCCESS",  response });
        yield put({ type: "SUCCESS_RESPONSE",  resStatus: { type: '', message: ''} });
    } catch (e) {
        yield put({ type: "FAILURE_RESPONSE",  resStatus: { type: 'error', message: e.message} });
    }
}
export default function* getPackegeSaga() {
    yield takeLatest("REQUEST_PACKEGE_DETAILS", getPackegeDteilsSaga);
}
import { put, call, takeLatest, all } from 'redux-saga/effects';
import Services from '../services/SignUp.Services.js';
import actions from '../actions/PopupActions';
const { createSignUp } = Services;
function* signUpSaga(action) {
    try {
        yield put(actions.requestPageLoader());
        const response = yield call(createSignUp, action);
        yield put({ type: "SIGNUP_SUCCESS",  response });
        yield put({ type: "SUCCESS_RESPONSE",  resStatus: { type: 'success', message: 'Thanks! Your account has been successfully created'} });
    } catch (e) {
        yield put({ type: "FAILURE_RESPONSE",  resStatus: { type: 'error', message: e.response.data.message} });
    }
}
export default function* SignUpSaga() {
    yield takeLatest("SIGNUP_REQUEST", signUpSaga)
}
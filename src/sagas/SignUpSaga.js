import { put, call, takeLatest, all } from 'redux-saga/effects';
import Services from '../services/SignUp.Services.js';
import actions from '../actions/PopupActions';
import { getErrorMessage } from '../utils/utils.js';

const { createSignUp } = Services;

function* signUpSaga(action) {
  try {
    yield put(actions.requestPageLoader());
    const response = yield call(createSignUp, action);
    yield put({ type: 'SIGNUP_SUCCESS', response });
    yield put({ type: 'SUCCESS_RESPONSE', resStatus: { type: 'success', message: 'Thanks! Your account has been successfully created' } });
  } catch (e) {
    let error = getErrorMessage(e);
    yield put({ type: 'FAILURE_RESPONSE', resStatus: { ...error } });
  }
}
export default function* SignUpSaga() {
  yield takeLatest('SIGNUP_REQUEST', signUpSaga);
}

import { put, call, takeLatest, all } from 'redux-saga/effects';
import Services from '../services/myTaskDashboard.Services.js';
import actions from '../actions/PopupActions';
const { getMytaskDashboardData, getReportListData } = Services;
function* getMyTaskDashboardSaga(action) {
    try {
        yield put(actions.requestPageLoader());
        const response = yield call(getMytaskDashboardData, action);
        yield put({ type: "GET_MY_TASK_LIST_SUCCESS",  response });
        yield put({ type: "SUCCESS_RESPONSE",  resStatus: { type: '', message: ''} });
    } catch (e) {
        yield put({ type: "FAILURE_RESPONSE",  resStatus: { type: 'error', message: e.message} });
    }
}

function* getReportListSaga(action) {
    try {
        yield put(actions.requestPageLoader());
        const response = yield call(getReportListData, action);
        yield put({ type: "GET_REPORT_LIST_SUCCESS",  response });
        yield put({ type: "SUCCESS_RESPONSE",  resStatus: { type: '', message: ''} });
    } catch (e) {
        yield put({ type: "FAILURE_RESPONSE",  resStatus: { type: 'error', message: e.message} });
    }
}

export default function* MyTaskDashboardSaga() {
    yield takeLatest("REQUEST_GET_DISCLOSURES_LIST", getMyTaskDashboardSaga);
    yield takeLatest("REQUEST_GET_REPORT_LIST", getReportListSaga);
    
}
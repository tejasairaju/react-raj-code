import { all, fork } from 'redux-saga/effects'
import SignUpSaga from './SignUpSaga';
import getPackegeSaga from './PackegeSaga';
import MyTaskDashboardSaga from './MyTaskDashboardSaga';


function* rootSaga() {
    yield all([
        fork(SignUpSaga),
        fork(getPackegeSaga),
        fork(MyTaskDashboardSaga)
    ])
  }

  export default rootSaga;
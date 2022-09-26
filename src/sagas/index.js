import { all, fork } from 'redux-saga/effects'
import SignUpSaga from './SignUpSaga';
import getPackegeSaga from './PackegeSaga';

function* rootSaga() {
    yield all([
        fork(SignUpSaga),
        fork(getPackegeSaga)
    ])
  }

  export default rootSaga;
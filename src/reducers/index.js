import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import StatusReducer from './StatusReducer';
import PackegeReducer from './PackegeReducer';

export default combineReducers({
  signup : SignUpReducer,
  statusResponse: StatusReducer,
  packeges: PackegeReducer
});
import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import StatusReducer from './StatusReducer';
import PackegeReducer from './PackegeReducer';
import MyTaskDashboardReducer from './MyTaskDashboardReducer';
import AppWizardReducer from './AppWizardReducer';

export default combineReducers({
  appWizard: AppWizardReducer,
  signup : SignUpReducer,
  statusResponse: StatusReducer,
  packeges: PackegeReducer,
  mytask: MyTaskDashboardReducer
});
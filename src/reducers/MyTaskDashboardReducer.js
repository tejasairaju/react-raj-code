import { getTaskCount } from "../utils/utils.js";
const initialState = { component: "MyTask Dashboard" };
const MyTaskDashboardReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case 'GET_MY_TASK_LIST_SUCCESS': {
            const { response } = action
            const listCount = getTaskCount(response);
            return {
                ...state,
                ...listCount,
                taskList: response.results
            }
        }
        case 'GET_REPORT_LIST_SUCCESS': {
            const { response } = action;
            return {
                ...state,
                reportCount: (response.results || []).length,
                reportList: response.results
            }
        }
        

        default:
            return state
    }
}

export default MyTaskDashboardReducer;
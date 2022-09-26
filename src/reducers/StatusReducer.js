
const initialState = { component: "Page Status", type: '', message: ''};
const StatusReducer = (state = {...initialState}, action)  => {
 switch (action.type) {
   case 'SUCCESS_RESPONSE': case 'FAILURE_RESPONSE': case 'REQUEST_PAGE_LOADER': case 'CLOSE_PAGE_LOADER':
     const { type = '', message = '' } = action.resStatus;
     return {
        ...state,
       type,
       message
     }
   default:
     return state
 }
}

export default StatusReducer;
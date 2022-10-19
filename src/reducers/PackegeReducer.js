
const initialState = { component: "SignUp Page"};
const PackegeReducer = (state = {...initialState}, action)  => {
 switch (action.type) {
   case 'GET_PACKEGE_SUCCESS':
     const { response } = action
     return {
       ...state,
       data: response.results
     }
     case 'UPDATE_SUBSCRIBE_DETAILS':
     const { payload } = action
     return {
       ...state,
       selectedPakege: {...payload}
     }
   default:
     return state
 }
}

export default PackegeReducer;
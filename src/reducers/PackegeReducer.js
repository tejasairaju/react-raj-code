
const initialState = { component: "SignUp Page"};
const PackegeReducer = (state = {...initialState}, action)  => {
 switch (action.type) {
   case 'GET_PACKEGE_SUCCESS':
     const { response } = action
     return {
       ...state,
       data: response
     }
   default:
     return state
 }
}

export default PackegeReducer;
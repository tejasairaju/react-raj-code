
const initialState = { component: "SignUp Page"};
 const CounterReducer = (state = {...initialState}, action)  => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      const { response } = action
      return {
        ...state,
        response
      }
    default:
      return state
  }
}

export default CounterReducer;

const initialState = { component: "SignUp Page" };
const CounterReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS': {
      const { response } = action
      return {
        ...state,
        response
      }
    }

    case 'ORGANISATIONS_DETAILS':
      const { payload } = action
      return {
        ...state,
        orgDetails: payload
      }
    case 'UPDATE_DB_STATUS': {
      const { flag } = action;
      return {
        ...state,
        orgDetails: {
          ...state.orgDetails,
          is_db_created: flag
        }
      }
    }

    case 'UPDATE_PAYMENT_STATUS': {
      const { flag } = action;
      return {
        ...state,
        orgDetails: {
          ...state.orgDetails,
          is_payment_done: flag
        }
      }
    }

    case 'CLEAR_SIGNUP_DETAILS': {
      return {
        ...state,
        orgDetails: {}
      }
    }

    default:
      return state
  }
}

export default CounterReducer;
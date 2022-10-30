
const initialState = { component: "SignUp Page",orgDetails: {name: 'sprint2'}  /*loginDetails: { user_id: "a190f7b4-b6ff-4caa-ba43-180e54e329bf"}  */};
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

    case 'REQUEST_TO_UPDATE_LOGIN_DETAILS': {
      const { payload } = action;
      return {
        ...state,
      loginDetails: {...payload }
      }
    }

    case 'CLEAR_SIGNUP_DETAILS': {
      return {
        ...state,
        orgDetails: {},
        loginDetails: {}
      }
    }

    default:
      return state
  }
}

export default CounterReducer;
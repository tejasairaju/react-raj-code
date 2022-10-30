const initialState = { component: "App Wizard" };
const AppWizardReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case 'UPDATE_WIZARD_DATA': {
            const { payload } = action;
            return {
                ...state,
                ...payload
            }
        }
        default:
            return state
    }
}

export default AppWizardReducer;
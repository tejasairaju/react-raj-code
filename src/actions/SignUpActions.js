const signUp = (payload)=> ({
    type: 'SIGNUP_REQUEST',
    payload
});

const organisationDatails = (payload)=> ({
    type: 'ORGANISATIONS_DETAILS',
    payload
});

const updateDbStatus = (flag = true) => ({
    type: 'UPDATE_DB_STATUS',
    flag
});

const updatePaymentStatus = (flag) => ({
    type: 'UPDATE_PAYMENT_STATUS',
    flag
});

const clearSignupDetails = (flag) => ({
    type: 'CLEAR_SIGNUP_DETAILS',
});

const loginDatails = (payload) => ({
    type: 'REQUEST_TO_UPDATE_LOGIN_DETAILS',
    payload
})

export default {
    signUp,
    organisationDatails,
    loginDatails,
    updateDbStatus,
    updatePaymentStatus,
    clearSignupDetails
}
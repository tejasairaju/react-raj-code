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
})

export default {
    signUp,
    organisationDatails,
    updateDbStatus,
    updatePaymentStatus
}
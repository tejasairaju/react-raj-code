const signUp = (payload)=> ({
    type: 'SIGNUP_REQUEST',
    payload
});

const organisationDatails = (payload)=> ({
    type: 'ORGANISATIONS_DETAILS',
    payload
});

const updateDbStatus = (flag) => ({
    type: 'UPDATE_DB_STATUS',
    flag
});

export default {
    signUp,
    organisationDatails,
    updateDbStatus
}
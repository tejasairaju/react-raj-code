const signUp = (payload)=> ({
    type: 'SIGNUP_REQUEST',
    payload
});

const organisationDatails = (payload)=> ({
    type: 'ORGANISATIONS_DETAILS',
    payload
});

export default {
    signUp,
    organisationDatails
}
const getPackegeDetails = ()=> ({
    type: 'REQUEST_PACKEGE_DETAILS'
});

const updateSubscribeDetails = (payload) => ({
 type:'UPDATE_SUBSCRIBE_DETAILS', 
 payload,
})

const paySuccess = (payload) => ({
    type: 'UPDATE_PAYMENT_SUCCESS',
    payload
})

export default {
    getPackegeDetails,
    updateSubscribeDetails,
    paySuccess
}
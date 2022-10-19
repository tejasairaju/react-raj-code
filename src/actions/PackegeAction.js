const getPackegeDetails = ()=> ({
    type: 'REQUEST_PACKEGE_DETAILS'
});

const updateSubscribeDetails = (payload) => ({
 type:'UPDATE_SUBSCRIBE_DETAILS', 
 payload,
})

export default {
    getPackegeDetails,
    updateSubscribeDetails
}
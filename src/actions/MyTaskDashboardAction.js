const getDisclosuresList = ({userId, orgName})=> ({
    type: 'REQUEST_GET_DISCLOSURES_LIST',
    userId,
    orgName
});


export default {
    getDisclosuresList,
}
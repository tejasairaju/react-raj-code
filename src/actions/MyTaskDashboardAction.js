const getDisclosuresList = ({userId, orgName})=> ({
    type: 'REQUEST_GET_DISCLOSURES_LIST',
    userId,
    orgName
});

const getReportList = ({userId, orgName}) => ({
    type: 'REQUEST_GET_REPORT_LIST',
    userId,
    orgName
});


export default {
    getDisclosuresList,
    getReportList
}
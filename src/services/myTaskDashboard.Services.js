import Request from '../Requests';
import axios from 'axios';
const { API_BASE_URL } = process.env;
const getMytaskDashboardData = async({userId = '', orgName = ''}) => {
    return await Request.Get(`/users/${userId}/tasks`, {organization: orgName });
}

const getReportListData = async({userId = '', orgName = ''}) => {
    return await Request.Get(`/users/${userId}/reports`, {organization: orgName});
}

export default {
    getMytaskDashboardData,
    getReportListData
}
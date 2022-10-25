import Request from '../Requests';
import axios from 'axios';
const { API_BASE_URL } = process.env;
const getMytaskDashboardData = async({userId = '', orgName = ''}) => {
    return await Request.Get(`/users/${userId}/tasks`, orgName);
}

export default {
    getMytaskDashboardData
}
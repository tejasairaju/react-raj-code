import Request from '../Requests';
import axios from 'axios';
const { API_BASE_URL } = process.env;
const getPackegeDteils = async({payload}) => {
    return await Request.Get(`/subscriptions/pricing`);
}

export default {
    getPackegeDteils
}
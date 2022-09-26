import Request from '../requests';
import axios from 'axios';
const { API_BASE_URL } = process.env;
const getPackegeDteils = async({payload}) => {
    return await Request.Get(`${API_BASE_URL}/subscriptions/pricing`);
}

export default {
    getPackegeDteils
}
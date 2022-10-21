import Request from '../Requests';
import axios from 'axios';
const { API_BASE_URL } = process.env;
const createSignUp = async({payload}) => {
    return await Request.Post(`${API_BASE_URL}/auth/signup`, payload);
}

export default {
    createSignUp
}
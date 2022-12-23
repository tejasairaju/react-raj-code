import Request from '../Requests';
import axios from 'axios';
const { API_BASE_URL } = process.env;

const createSignUp = async ({ payload }) => {
  return await Request.Post(`/auth/signup`, payload, null);
};

export default {
  createSignUp
};

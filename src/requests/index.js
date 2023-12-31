import axios from "axios";
import _isEmpty from 'lodash/isEmpty';
import { constractURLQueryStr } from '../utils/utils.js';

const getHeaders = () => {

    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-length': 434343,
            'Host': '3.11.40.159 '
        }
    }
}

async function Get(url, org = {}, cookie) {
    const config = getHeaders(cookie);
    let pathUrl = '';
    if (!_isEmpty(org)) {
        pathUrl = `${process.env.API_BASE_URL}${url}${constractURLQueryStr(org)}`;
    } else {
        pathUrl = `${process.env.API_BASE_URL}${url}`;
    }
    return await axios.get(pathUrl, config)
        .then(({ data }) => data);
}

async function Post(url = '', data = {}, org = {}, cookie) {
    const config = getHeaders(cookie);
    let pathUrl = '';
    if (org) {
        pathUrl = `${process.env.API_BASE_URL}${url}${constractURLQueryStr(org)}`;
    } else {
        pathUrl = `${process.env.API_BASE_URL}${url}`;
    }
    let payload = null;
    if(Array.isArray(data)) {
        payload = [...data];
    } else {
        payload = { ...data };
    }
    return await axios.post(pathUrl, payload, config)
        .then(({ data }) => data);
}

async function Put(url, data, org = '', cookie) {
    const config = getHeaders(cookie);
    let pathUrl = '';
    if (org) {
        pathUrl = `${process.env.API_BASE_URL}${url}${constractURLQueryStr(org)}`;
    } else {
        pathUrl = `${process.env.API_BASE_URL}${url}`;
    }
    return await axios.put(pathUrl, {...data}, config)
        .then(({ data }) => data);
}

async function Patch(url, data, org = '', cookie) {
    const config = getHeaders(cookie);
    let pathUrl = '';
    if (org) {
        pathUrl = `${process.env.API_BASE_URL}${url}${constractURLQueryStr(org)}`;
    } else {
        pathUrl = `${process.env.API_BASE_URL}${url}`;
    }
    return await axios.patch(pathUrl, {...data}, config)
        .then(({ data }) => data);
}

async function Delete(url, org = '', cookie) {
    // const config = getHeaders(cookie);
    // return await axios.delete(url, config)
    //     .then(({ data }) => data);

        const config = getHeaders(cookie);
        let pathUrl = '';
        if (org) {
            pathUrl = `${process.env.API_BASE_URL}${url}${constractURLQueryStr(org)}`;
        } else {
            pathUrl = `${process.env.API_BASE_URL}${url}`;
        }
        return await axios.delete(pathUrl, config)
            .then(({ data }) => data);
}

export default {
    Get,
    Post,
    Put,
    Patch,
    Delete
}
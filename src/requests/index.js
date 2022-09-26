import axios from "axios";

const getHeaders = () => {

    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-length': 434343,
            'Host': '13.40.76.135'
        }
    }
}

async function Get(url, cookie) {
    const config = getHeaders(cookie);
    return await axios.get(url, config)
        .then(({ data }) => data);
}

async function Post(url = '', data = {}, cookie) {
    const config = getHeaders(cookie);
    return await axios.post(url, {...data}, config)
        .then(({ data }) => data);
}

async function Put(url, data, cookie) {
    const config = getHeaders(cookie);
    return await axios.put(url, data, config)
        .then(({ data }) => data);
}
 async function Delete(url, cookie) {
    const config = getHeaders(cookie);
    return await axios.delete(url, config)
        .then(({ data }) => data);
 }




export default {
    Get,
    Post,
    Put
}
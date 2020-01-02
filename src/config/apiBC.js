import axios from 'axios'

const api = axios.create({
    baseURL: 'https://blockchain.info/rawaddr/',
    timeout: 5000,
});

export default api;
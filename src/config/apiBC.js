const axios = require('axios');

const api = axios.create({
    baseURL: 'https://blockchain.info/rawaddr/',
    timeout: 5000,
});

module.exports = api;
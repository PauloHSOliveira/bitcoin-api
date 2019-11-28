const axios = require('axios');

axios.create({
    baseURL: 'https://blockchain.info/rawaddr/',
    timeout: 5000,
});

module.exports = axios;
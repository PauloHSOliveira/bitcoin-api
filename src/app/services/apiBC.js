const axios = require('axios');

const api = axios.create({
    baseURL:'https://blockchain.info/rawaddr/'
});

module.exports = api;
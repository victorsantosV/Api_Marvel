const axios = require('axios')
const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public'
})

module.exports = { api }
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json()) // enteda requisicao em json
app.use(bodyParser.urlencoded({ extended: false })) // entende parametro urlencoded

require('./api/api_marvel_exemplo')(app)

app.listen(400, (req, res) => {
    console.log("Conectado")
})
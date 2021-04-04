const express = require('express')
const marvel = require('./api_marvel.js')
const router = express.Router()
const MD5 = require('md5')

router.get("/characters/?:name", async(req, res) => {
    //config para acessar a API

    const privateKey = "eef1313568b487b509c1ebafce47ed8560aa435b"
    const publicKey = "271cd922471ff6d5a9086c784f28fe36"
    const { name } = req.params
    const ts = Date.now()
    const hash = MD5(ts + privateKey + publicKey)

    try {
        const { data } = await marvel.api.get(`characters?name=${name}&apikey=${publicKey}&hash=${hash}&ts=${ts}`)
            //parametros para conexao com a api Marvel
        const indice = []
        const extend = await data.data.results[0]
        const titulos = await extend.comics.items
            /* acesso a Cost data que eh uma function, que tem o parametro data e esse data tem um array chamado results
            esse result precisa para o indereco que passa 0, e consegue acessar as info desse array */
        console.log("HEROI: ", extend.name)
        console.log('')
        console.log("DESCRIÇÃO: ", extend.description)
        console.log('')
        console.log("THUMBNAIL: ", extend.thumbnail.path + '.jpg')
        console.log('')

        for (var pos = 0; pos < titulos.length; pos++) { //aqui ele faz um for e verifica o tamanho do array e retorna o tamanho do array com os dados processados
            console.log("Os Titulos são: ", titulos[pos].name);

        }
        return res.send(extend)
    } catch (error) {

        res.send({ error: error.message })
        console.log(error)
    }
})

module.exports = app => app.use('/marvel', router) //chama o router com o prefixo /auth
const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancodeDados() {
    try {
        console.log("A conexão com o banco de dados iniciou.")
            await mongoose.connect(process.env.MONGO_URL) // proteção do banco de dados
        console.log("A conexão foi feita com sucesso!")
    }
    catch(erro) {
        console.log(erro)
    }
}
    module.exports = conectaBancodeDados // exportação da função
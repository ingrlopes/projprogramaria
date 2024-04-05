const express = require("express")
const router = express.Router()
const app = express()
const porta = 3333
const mulheres = [
    {
        nome: 'Ingrid Lopes',
        imagem: 'Cabelos loiros, olhos puxados e parda',
        minibio: 'Inteligente e linda'
    },
    {
        nome: 'Marcia Cristina',
        imagem: 'Cabelos pretos, olhos médios e morena',
        minibio: 'MÃE, inteligente e linda'
    },
    {
        nome: 'Erika Moraes',
        imagem: 'Cabelos castanhos, olhos grandes e morena não muito escura',
        minibio: 'Irmã, linda e inteligente'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)
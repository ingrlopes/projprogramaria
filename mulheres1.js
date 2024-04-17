// COMO TUDO SE INICIA, ANTES DE REALMENTE UTILIZAR
// AS INFORMAÇÕES DO MONGOOSE E DO BANCO DE DADOS
// -------------------------------------------------
// QUANDO UTILIZADO O MONGOOSE/BANCO DE DADOS, TODAS
// AS FUNÇÕES SE TORNAM "ASYNC"

const express = require('express') // iniciando express
const router = express.Router() // config. primeira parte da rota
const { v4: uuidv4 } = require('uuid')

const conectaBancodeDados = require('./bancodeDados') // exportando função
conectaBancodeDados() // iniciando função

const app = express() // iniciando o app
app.use(express.json())

const porta = 2222 // criando a porta

// lista inicial de mulheres
const mulheres = [
    {
        id: '1',
        nome: 'Ingrid Lopes',
        descrição: 'Cabelos loiros, olhos puxados e parda',
        minibio: 'Inteligente e linda'
    },
    {
        id: '2',
        nome: 'Marcia Cristina',
        descrição: 'Cabelos pretos, olhos médios e morena',
        minibio: 'MÃE, inteligente e linda'
    },
    {
        id: '3',
        nome: 'Erika Moraes',
        descrição: 'Cabelos castanhos, olhos grandes e morena não muito escura',
        minibio: 'Irmã, linda e inteligente'
    }
]
// função GET
function mostraMulheres(request, response) {
    response.json(mulheres)
}
// função POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        descrição: request.body.descrição,
        minibio: request.body.minibio
    }
    mulheres.push(novaMulher) // recebendo a nova mulher na lista
    response.json(mulheres) // envia a lista atual
}
// função PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if(mulher.id === request.params.id) {
            return mulher
        }
    }
      const mulherEncontrada = mulheres.find(encontraMulher)
    
    if(request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }
    if(request.body.descrição) {
        mulherEncontrada.descrição = request.body.descrição
    }
    if(request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }
        response.json(mulheres)
}
// função DELETE
function deletaMulher(request, response) {
    function mulherErrada(mulher) {
        if(mulher.id !== request.params.id) {
            return mulher
        }
    }
    const mulheresCertas = mulheres.filter(mulherErrada)
    response.json(mulheresCertas)
}

app.use(router.get('/mulheres', mostraMulheres)) // config. rota GET 
app.use(router.post('/mulheres', criaMulher)) // config. rota POST
app.use(router.patch('/mulheres/:id', corrigeMulher)) // config. rota PATCH
app.use(router.delete('/mulheres/:id', deletaMulher)) // config. rota DELETE

// função PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta) // config. rota PORTA

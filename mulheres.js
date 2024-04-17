const express = require("express") // iniciando express
const router = express.Router() // config. primeira parte da rota
const cors = require('cors') // pacote cors permite consumir essa api no frontend

const conectaBancodeDados = require('./bancodeDados') // exportando função
conectaBancodeDados() // iniciando função

const Mulher = require('./mulherModel') // modelo

const app = express() // iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 // criando a porta

// função GET do mongoose
async function mostraMulheres(request, response) {
    try {
        const mulheresBancodeDados = await Mulher.find()
            response.json(mulheresBancodeDados)

    } catch (erro) {
        console.log(erro)

    }
}
// função POST do mongoose
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        descrição: request.body.descrição,
        minibio: request.body.minibio,
        imagem: request.body.imagem
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)

    } catch (erro) {
        console.log(erro)
    }
}
// função PATCH do mongoose
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
    if (request.body.nome) {
        mulherEncontrada.nome =  request.body.nome
    }
    if (request.body.descrição) {
        mulherEncontrada.descrição =  request.body.descrição
    }
    if (request.body.minibio) {
        mulherEncontrada.minibio =  request.body.minibio
    }
    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
    }
        const mulherAtualizada = await mulherEncontrada.save()
        response.json(mulherAtualizada)

    } catch (erro) {
        console.log(erro)
    }
}
// função DELETE do mongoose
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ messagem: 'Mulher deletada com sucesso.'})

    } catch (erro) {
        console.log(erro)
    }
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
import express from 'express'

const app = express()

import './database/connection'

// GET = BUSCAR UMA INFORMAÇÃO
// POST = CRIAR UMA INFORMAÇÃO
// PUT = EDITANDO UMA INFORMAÇÃO
// DELETE = DELETANDO UMA INFORMAÇÃO

app.get('/teste', (request, response) => {
    return response.json({ message: 'Hello World'})
})

app.post('/teste', (request, response) => {
    console.log(request.query)

    return response.json({ message: 'Hello World'})
})

app.listen(3333)
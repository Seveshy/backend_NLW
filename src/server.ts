import express from 'express'

import './database/connection'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

// GET = BUSCAR UMA INFORMAÇÃO
// POST = CRIAR UMA INFORMAÇÃO
// PUT = EDITANDO UMA INFORMAÇÃO
// DELETE = DELETANDO UMA INFORMAÇÃO

app.listen(3333)
import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import path from 'path'
import errorHandle from './errors/handler'

import './database/connection'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandle)

// GET = BUSCAR UMA INFORMAÇÃO
// POST = CRIAR UMA INFORMAÇÃO
// PUT = EDITANDO UMA INFORMAÇÃO
// DELETE = DELETANDO UMA INFORMAÇÃO

app.listen(3333)
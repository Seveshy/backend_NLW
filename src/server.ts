import express from 'express'
import { getRepository } from 'typeorm'
import Orphanange from './models/Orphanages'
import bodyParser from 'body-parser';


const app = express()
app.use(express.json())

import './database/connection'

// GET = BUSCAR UMA INFORMAÇÃO
// POST = CRIAR UMA INFORMAÇÃO
// PUT = EDITANDO UMA INFORMAÇÃO
// DELETE = DELETANDO UMA INFORMAÇÃO


app.post('/orphananges', async (request, response) => {
   
    const { 
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,  
    } = request.body;

    const orphanangesRepository = getRepository(Orphanange)

    const orphanange = orphanangesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends   
    })

    await orphanangesRepository.save(orphanange);

    return response.status(201).json(orphanange)

})

app.listen(3333)
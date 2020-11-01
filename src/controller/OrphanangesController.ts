import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanange from '../models/Orphanages'

import orphanageView from '../views/orphanages_views'

export default {
    async index(request: Request, response: Response) {
        const orphanangesRepository = getRepository(Orphanange)

        const orphanages = await orphanangesRepository.find({
            relations: ['images']
        })

        return response.json(orphanageView.renderMany(orphanages))
    },

    async show(request: Request, response: Response) {
        const { id }  = request.params
        
        const orphanangesRepository = getRepository(Orphanange)

        const orphanage = await orphanangesRepository.findOneOrFail(id)

        return response.json(orphanageView.render(orphanage))
    },

    async create(request: Request, response: Response) {
        

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

          
          const requestImages = request.files as Express.Multer.File[]

          const images = requestImages.map(image => {
              return { path: image.filename }
          })
           
          const orphanange = orphanangesRepository.create({
              nome,
              latitude,
              longitude,
              about,
              instructions,
              opening_hours,
              open_on_weekends,
              images
          })

          await orphanangesRepository.save(orphanange);
      

          return response.status(201).json(orphanange)

          
    }
}
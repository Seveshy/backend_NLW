import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanange from '../models/Orphanages'

export default {
    async index(request: Request, response: Response) {
        const orphanangesRepository = getRepository(Orphanange)

        const orphananges = await orphanangesRepository.find()

        return response.json(orphananges)
    },

    async show(request: Request, response: Response) {
        const { id }  = request.params
        
        const orphanangesRepository = getRepository(Orphanange)

        const orphanange = await orphanangesRepository.findOneOrFail(id)

        return response.json(orphanange)
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
              name,
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
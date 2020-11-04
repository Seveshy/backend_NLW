import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanange from '../models/Orphanages'

import * as Yup from 'yup'
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

        const orphanage = await orphanangesRepository.findOneOrFail(id, {
            relations: ['images']
        })

         response.json(orphanageView.render(orphanage))


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

          const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false
        })
           
          const orphanange = orphanangesRepository.create(data)

          await orphanangesRepository.save(orphanange);
      

          return response.status(201).json(orphanange)

          
    }
}
import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/uploads'
import OrphanangesController from './controller/OrphanangesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.post('/orphananges', upload.array('images'), OrphanangesController.create)
routes.get('/orphananges', OrphanangesController.index)
routes.get('/orphananges/:id', OrphanangesController.show)

export default routes



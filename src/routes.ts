import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/uploads'
import OrphanangesController from './controller/OrphanangesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphananges', OrphanangesController.index)
routes.get('/orphananges/:id', OrphanangesController.show)
routes.post('/orphananges', upload.array('images'), OrphanangesController.create)

export default routes



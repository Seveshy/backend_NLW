import { Router } from 'express'

import OrphanangesController from './controller/OrphanangesController'

const routes = Router()

routes.post('/orphananges', OrphanangesController.create)
routes.get('/orphananges', OrphanangesController.index)
routes.get('/orphananges/:id', OrphanangesController.show)

export default routes
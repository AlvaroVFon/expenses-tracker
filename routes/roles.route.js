import { Router } from 'express'
import { create, findAll } from '../controllers/roles.controller.js'
import { paginate } from '../middlewares/paginate.js'

const router = Router()

router.post('/roles', create).get('/roles', paginate, findAll)

export { router as rolesRouter }

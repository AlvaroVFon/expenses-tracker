import { Router } from 'express'
import { create, findAll } from '../controllers/roles.controller.js'
import { paginate } from '../middlewares/paginate.js'
import { createRoleValidation } from '../middlewares/roles/createRoleValidation.js'

const router = Router()

router
    .post('/roles', createRoleValidation, create)
    .get('/roles', paginate, findAll)

export { router as rolesRouter }

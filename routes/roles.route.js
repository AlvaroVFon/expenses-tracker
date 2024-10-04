import { Router } from 'express'
import { create, findAll, findOne, update } from '../controllers/roles.controller.js'
import { paginate } from '../middlewares/paginate.js'
import { createRoleValidation } from '../middlewares/roles/createRoleValidation.js'
import { isSuperAdmin } from '../middlewares/permissions/isSuperadmin.js'
import { updateRoleValidation } from '../middlewares/roles/updateRoleValidation.js'

const router = Router()

router
  .post('/', isSuperAdmin, createRoleValidation, create)
  .get('/', paginate, findAll)
  .get('/:id', findOne)
  .patch('/:id', isSuperAdmin, updateRoleValidation, update)

export { router as rolesRouter }

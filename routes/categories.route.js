import { Router } from 'express'
import { create, findAll, findOne } from '../controllers/categories.controller.js'
import { createCategoryValidation } from '../middlewares/categories/createCategoryValidation.js'
import { paginate } from '../middlewares/paginate.js'
import { isSuperAdmin } from '../middlewares/permissions/isSuperadmin.js'

const router = Router()

router.post('/', [isSuperAdmin, createCategoryValidation], create).get('/', paginate, findAll).get('/:id', findOne)

export { router as categoriesRouter }
